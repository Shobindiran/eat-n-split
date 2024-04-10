import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App(){
  const [friends,setFriends] = useState(initialFriends);
  const [showAddFriend,setShowAddFriend] = useState(false);
  const [selectedFriend,setSelectedFriend] = useState(null);

  function handleShowAddFriend(){
    setShowAddFriend((prev)=>!prev)
  }

  function handleAddfriend(friend){
    setFriends((prev)=>[...prev,friend]);
    setShowAddFriend((prev)=>!prev)
  }

  function handleSelectFriend(friend){
    setSelectedFriend((curr)=>
    curr?.id===friend.id?null:friend
    );
    setShowAddFriend(false);
  }

  function handleSplitBill(value){
    setFriends(prev=>prev.map(
      friend=>friend.id===selectedFriend.id
        ? {...friend,balance:friend.balance+value}
        : friend
      ));

    setSelectedFriend(null)
  }

  return(
    <div className="app">
      <div className="sidebar">
        <FriendsList 
        friends={friends} 
        onSelectFriend={handleSelectFriend}
        selectedFriend={selectedFriend}
        />
        
        {showAddFriend && <FormAddFriend onAddFriend={handleAddfriend}/>}
        
        <Button onClick={handleShowAddFriend}>{showAddFriend? "Close" : "Add Friend"}</Button>
      </div>

      {selectedFriend && <FormSplitBill key={selectedFriend.id} friend={selectedFriend} onSplitBill={handleSplitBill}/>}
    </div>
  )
}

function Button({children,onClick}){
  return <button onClick = {onClick} className="button">{children}</button>
}

function FriendsList({friends,onSelectFriend,selectedFriend}){ 

  return(
    <ul>{friends.map((friend)=>(
      <Friend key={friend.id} friend={friend} onSelectFriend={onSelectFriend} selectedFriend={selectedFriend}/>
    ))}</ul>
  )
}

function Friend({friend,onSelectFriend,selectedFriend}){
  const isSelected = selectedFriend?.id === friend.id;

  return(
    <li className={isSelected?"selected" : ""} >
      <img src={friend.image} alt={friend.name}/>
      <h3>{friend.name}</h3>
      {friend.balance<0 && (
        <p className="red">You owe {friend.name} ${Math.abs(friend.balance)}</p>
      )}
      {friend.balance>0 && (
        <p className="green">{friend.name} owe you ${friend.balance}</p>
      )}
      {friend.balance===0 && (
        <p>You & {friend.name} are even</p>
      )}

      <Button onClick={()=>onSelectFriend(friend)} className="button">{isSelected? "close" : "Select"}</Button>
    </li>
  )
}

function FormAddFriend({onAddFriend}){
  const [name,setName] = useState("");
  const [image,setImage] = useState("https://i.pravatar.cc/48")

  function handleSubmit(e){
    e.preventDefault();

    if(!name || !image) return;

    const id = crypto.randomUUID();
    const newFriend={
      id,
      name,
      image:`${image}?u=${id}`,
      balance:0,
    }
    onAddFriend(newFriend);

    setName("");
    setImage("https://i.pravatar.cc/48")
  };

  return(
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>🧑‍🤝‍🧑Friend name</label>
      <input type="text" value={name} onChange={(e)=>setName(e.target.value)}/>
      <label>📷Image URl</label>
      <input type="text" value={image} onChange={(e)=>setImage(e.target.value)}/>

      <Button className="button">Add</Button>
    </form>
  )
}

function FormSplitBill({friend,onSplitBill}){
  const [bill,setBill] = useState(0);
  const [paidByUser,setPaidByUser] = useState(0);
  const paidByFriend = bill-paidByUser;
  const [whoIsPaying,setWhoIsPaying] = useState("user");

  function handleSubmit(e){
    e.preventDefault();

    if(!bill) return;

    onSplitBill(whoIsPaying==="user"? paidByFriend : -paidByUser);
  }

  return(
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split a bill with {friend.name}</h2>

      <label>💵 Bill value</label>
      <input type="number"
        value={bill}
        onChange={(e)=>setBill(Number(e.target.value))}
      />

      <label>🕴️ Your expense</label>
      <input type="number"
        value={paidByUser}
        onChange={(e)=>setPaidByUser(
          Number(e.target.value)>bill ? paidByUser : Number(e.target.value)
          )
        }
      />

      <label>🧑‍🤝‍🧑 {friend.name}'s expense</label>
      <input disabled type="number" value={paidByFriend }/>

      <label>🤑 Who is paying the bill</label>
      <select value={whoIsPaying}
      onChange={(e)=>setWhoIsPaying(e.target.value)}
      >
        <option value="user">You</option>
        <option value="friend">{friend.name}</option>
      </select>

      <Button className="button">Split Bill</Button>
    </form>
  )
}