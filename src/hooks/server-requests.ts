import { Message } from "../types/message";
import { mockUsers } from "../assets/mockUsers"; // todo: remove this line after server implementation

const endpoint = "../assets/"; // todo: add endpoint (server) address (starting with http://)

/**
 * GET Request to get the list of messages
 **/
export async function getMessages() {
  // todo: replace this with fetch to get the messages from the server
  // const { mockMessages } = await import(`${endpoint}/mockMessages`);
  const req = await fetch("http://localhost:3005/getMessages");
  const res = await req.json();
  console.log(res);

  // todo: this should be implemented in the server. Chat Messages should already have the authors' names.
  // todo: remove this mapping when getting the data from the server

  return res;
}

/**
 * GET request to get the full list of users - id + name
 **/
export async function getUsers() {
  // todo: replace this with fetch to get the user list from the server
  const req = await fetch("http://localhost:3005/getUsers");
  const res = await req.json();
  return res;

  // const { mockUsers } = await import(`${endpoint}/mockUsers`);
  // return mockUsers;
}

/**
 * GET request to get the full details of a user
 **/
export async function getUserDetails(userId: number) {
  // todo: replace this with fetch to get the user details from the server.
  //  For mocking example, we're calling an external JSON service.
  //  You can use mockUserDetails.ts for the list of user details in the server.
  const req = await fetch(`http://localhost:3005/getUserDetails/${userId}`);
  const res = await req.json();
  console.log(res);
  return res[0];

  // const res = await fetch(
  //   `https://jsonplaceholder.typicode.com/users?id=${userId}`
  // );
  // return (await res.json())[0];
}

/**
 * POST request to add a message. The message contains: id, body, timestamp, authorId
 **/
export async function addNewMessage(message: Message) {
  // todo: implement sending a new message to the server
  await fetch(`http://localhost:3005/addNewMessage`, {
    method: "POST",
    headers: { "content-Type": "application/json" },
    body: JSON.stringify(message),
  });
}

/**
 * POST request to change the user's like of a message
 **/
export async function changeMessageLikes(
  messageId: number,
  userId: number,
  like: boolean
) {
  // todo: implement sending a rquest to change the like of a message by the user
  await fetch(`http://localhost:3005/changeMessageLikes`, {
    method: "POST",
    headers: { "content-Type": "application/json" },
    body: JSON.stringify({ messageId, userId }),
  });
}
