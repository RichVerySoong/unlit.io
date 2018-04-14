unlit.io

An online game built with socket.IO and HTML5 canvas on top of NodeJS.

---

## How to Play
You can check out how to play on our [wiki](https://github.com/huytd/agar.io-clone/wiki/How-to-Play).

#### Game Basics
- Move your mouse around the screen to move your cell.
- Eat food and other players in order to grow your character (food respawns every time a player eats it).
- A player's **mass** is the number of food particles eaten.
- **Objective**: Try to get as big as possible and eat other players.

#### Gameplay Rules
- Players who haven't eaten yet cannot be eaten as a sort of "grace" period. This invincibility fades once they gain mass.
- Everytime a player joins the game, **3** food particles will spawn.
- Everytime a food particle is eaten by a player, **1** new food particle will respawn.
- The more food you eat, the slower you move to make the game fairer for all.

---

## License
>You can check out the full license [here](https://github.com/huytd/agar.io-clone/blob/master/LICENSE).

This project is licensed under the terms of the **MIT** license.
