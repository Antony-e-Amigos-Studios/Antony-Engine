var game = new Game();
var player = new Player(10,20,100,100);
var loaded = 0;

player.name = "player";

player.add_component("animator", new Animator());
player.components["animator"].add_frame("top.png", "idle");
player.components["animator"].add_frame("top2.png", "idle");

player.components["animator"].onimgload = () => {
  loaded++;

  player.components["animator"].set_current_animation("idle");
  player.components["animator"].adjust_size(player);
  
  if (loaded >= 2) {
    player.components["animator"].set_velocity(10);
    player.components["animator"].play();

    game.entities.push(player);

    var map = [
              ['1','1','1','1','1','1'],
              ['1','0','0','0','0','0'],
              ['1','0','0','2','0','0'],
              ['1','1','1','1','1','1']
            ];
    var mapObj = new GameMap(map, {width:game.width, height:game.height},
                                  {'1': new Tile(0,0,"tile1.png"), '2': player});
    var scn = new Scene(mapObj);

    game.create_scene("scene1", scn);
    game.select_scene("scene1");

    game.main()
  }
};
// :sob:

// essa foi de fude
// kkkkkk percebi
// só n ta desenhando lol