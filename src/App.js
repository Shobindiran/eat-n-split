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

  return(
    <div className="app">
      <div className="sidebar">
        <FriendsList/>
        <FormAddFriend/>
        <Button>Add Friend</Button>
      </div>

      <FormSplitBill/>
    </div>
  )
}


function FriendsList(){ 

  const friends = initialFriends;


  return(
    <ul>{friends.map((friend)=>(
      <Friend key={friend.id} friend={friend}/>
    ))}</ul>
  )
}

function Friend({friend}){
  return(
    <li id={friend.id} >
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

      <Button className="button">Select</Button>
    </li>
  )
}

function FormAddFriend(){
  return(
    <form className="form-add-friend">
      <label>🧑‍🤝‍🧑Friend name</label>
      <input type="text"/>
      <label>📷Image URl</label>
      <input type="text"/>

      <Button className="button">Add</Button>
    </form>
  )
}


function Button({children}){
  return <button className="button">{children}</button>
}


function FormSplitBill(){
  return(
    <form className="form-split-bill">
      <h2>Split a bill with X</h2>

      <label>💵 Bill value</label>
      <input type="text"/>

      <label>🕴️ Your expense</label>
      <input type="text"/>

      <label>🧑‍🤝‍🧑 X's expense</label>
      <input disabled type="text"/>

      <label>🤑 Who is paying the bill</label>
      <select>
        <option value="user">You</option>
        <option value="friend">X</option>
      </select>

      <Button className="button">Split Bill</Button>
    </form>
  )
}