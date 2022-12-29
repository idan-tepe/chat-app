import express, { Request, Response } from "express";
import { mockMessages } from "./mockMessages";
import { mockUserDetails } from "./mockUserDetails";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("hello");
});

app.get("/getMessages", (req: Request, res: Response) => {
  console.log("started");
  const mockMessagesWithNames = mockMessages.map((message) => {
    const author = mockUserDetails.find((user) => user.id === message.authorId);
    const authorName = author && author.name;
    return { ...message, authorName };
  });

  res.send(mockMessagesWithNames);
});

app.get("/getUsers", (req: Request, res: Response) => {
  const usersList = mockUserDetails.map((user) => {
    const name = user.name;
    const id = user.id;
    return { name, id };
  });
  res.send(usersList);
});
app.get("/getUserDetails/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const user = mockUserDetails.filter((user) => user.id === +id);
  res.send(user);
});

app.post("/addNewMessage", bodyParser.json(), (req: Request, res: Response) => {
  const newmsg = req.body;
  mockMessages.push({ ...newmsg, likes: [] });
  res.sendStatus(200);
});
app.post(
  "/changeMessageLikes",
  bodyParser.json(),
  (req: Request, res: Response) => {
    const obj = req.body;
    const msgId: number = obj.messageId;
    const userId: number = obj.userId;
    const like: boolean = obj.like;
    let theMsg = mockMessages.filter((msg) => msg.id === msgId);
    if (theMsg[0].likes.includes(userId)) {
      theMsg[0].likes.map((element, index) => {
        if (element === userId) {
          theMsg[0].likes.splice(index, 1);
        }
      });
    } else {
      theMsg[0].likes.push(userId);
    }
    res.sendStatus(200);
  }
);

app.listen(3005, () => {
  console.log("server is running");
});
