var game = new Game();
var player = new Player(10,20,100,100);

player.create_animator();
player.animator.add_frame("top.png","idle");
player.animator.add_frame("top2.png", "idle");
player.animator.set_current_animation("idle");

game.entities.push(player);
game.main()
