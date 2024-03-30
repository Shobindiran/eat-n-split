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
      </div>
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
    <li id={friend.id} >{friend.name}
      <img src={friend.image} alt={friend.name}/>
      balance:{friend.balance}
    </li>
  )
}