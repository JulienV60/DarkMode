import express from "express";
import nunjucks from "nunjucks";
import cookie from "cookie";

///Truc important pour express et nunjucks
const app = express();
app.use(express.static("public"));
nunjucks.configure("views", {
  autoescape: true,
  express: app,
});
app.set("view engine", "njk");
const formParser = express.urlencoded({ extended: true });

///

///Routes entrée
app.get("/", (request, response) => {
  response.render("home");
});

/// home.njk>options
app.get("/options", (request, response) => {
  response.render("options");
});
//options/add-cookie/options
app.post("/add-cookie", formParser, (request, response) => {
  const color = request.body.appearance;
  console.log(color);
  response.set(
    "Set-Cookie",
    cookie.serialize("myCookie", color, {
      maxAge: 3600,
    }),
  );
  if (color === "Dark") {
    response.send("/public/dark-mode.css");
    response.redirect("/options");
  } else {
    response.redirect("/options");
  }
});

app.get("/view-cookie", (request, response) => {
  const cookies = cookie.parse(request.get("cookie") || "");
  response.send(cookies.myCookie);
});

app.get("/clear-cookie", (request, response) => {
  response.set(
    "Set-Cookie",
    cookie.serialize("myCookie", "", {
      maxAge: 0,
    }),
  );
});
app.listen(3000, () => {
  console.log("http://localhost:3000");
});
