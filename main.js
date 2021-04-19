var game = new Game();
var player = new Player(10,20,100,100);

player.name = "player";
player.add_component("animator", new Animator());

player.get("animator").add_animation("idle");
player.get("animator").set_current_animation("idle");

const load_callback = (img) => {
  player.get("animator").add_frame(img, "idle");
  player.get("animator").adjust_size(player);
};

var sprt_top  = new Sprite("top.png", load_callback);
var sprt_top2 = new Sprite("top2.png", load_callback);

player.get("animator").set_velocity(10);
player.get("animator").play();

game.add_entity(player);
game.main()