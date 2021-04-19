var game = new Game();
var player = new Player(10,20,100,100);

player.add_component("animator", new Animator());
player.components["animator"].add_frame("top.png", "idle");
player.components["animator"].add_frame("top2.png", "idle");
player.components["animator"].set_current_animation("idle");
player.components["animator"].set_velocity(10);
player.components["animator"].play();

game.entities.push(player);
game.main()