enchant();
//修正点メモ
//GameOverScene()のLabelの変更
//Playerの操作-ジャンプをZキーに変更
//openingSceneのキー入力をXに変更
//当たり判定をより精密に
//移動速度の変更



window.onload = function() {

	var game = new Game(640, 480);
	game.preload('title.png', 'chara1.png', 'start.png','map2.png','opening.png','black.png','clear.png','gameover.png','goal.png','switchPanel.png', 'open.png','chara6.png','swi.png');
	game.fps = 24;


	var posStage = 1; //現在のステージ
	var switchFlag = false; //スイッチ用フラグ
	var NPCFlag = false; //合体用フラグ
	var goalFlag = false; //ゴール用フラグ(一応)


	game.onload = function() {

		game.keybind('Z'.charCodeAt(0), 'a');
		game.keybind('X'.charCodeAt(0), 'b');


		game.replaceScene(createTitleScene());







	}


	//フラグを落とす。
	var flagReset = function() {
		switchFlag = false;
		NPCFlag = false;
		goalFlag = false;
	}






	var createTitleScene = function() {
		var scene = new Scene();
		var titleImage = new Sprite(640, 480);
		titleImage.image = game.assets['title.png'];
		var startImage = new Sprite(236, 48);
		startImage.image = game.assets['start.png'];
		startImage.x = 0;
		startImage.y = 422;

		startImage.addEventListener(Event.TOUCH_START, function() {
				game.replaceScene(createOpeningScene());
			});

		scene.addChild(titleImage);
		scene.addChild(startImage);

		return scene;

	};





	var createOpeningScene = function() {
		var scene = new Scene();
		scene.backgroundColor = '#00FFFF';
		var label1 = new Label('オープニング');
		label1.moveTo(100, 100);
		label1.color = 'black';
		label1.font  = "24px 'Consolas', 'Monaco', 'ＭＳ ゴシック'";

		var label2 = new Label('push X');
		label2.moveTo(400, 422);
		label2.color = 'black';
		label2.font  = "24px 'Consolas', 'Monaco', 'ＭＳ ゴシック'";

		scene.addEventListener(Event.ENTER_FRAME, function() {
				if(game.input.b) game.replaceScene(createGameScene(posStage));
			});

		scene.addChild(label1);
		scene.addChild(label2);

		return scene;

	}



	var createGameScene = function(stage) {
		var scene = new Scene();
		var map = new Map(16, 16);
		map.image = game.assets['map2.png'];
		flagReset();


	var timeLabel = function(time, x, y) {
		var label = new Label();
		var remainingTime = time;
		label.x = x;
		label.y = y;

		game.frame = 0;
		label.addEventListener(Event.ENTER_FRAME, function() {
			var progress = parseInt(game.frame/game.fps); //経過時間の取得
			time = remainingTime - progress;
			label.text = 'TIME : ' + time;
			if(time < 0) game.replaceScene(createGameOverScene());
			})


			return label;
		}


		switch(stage) {
			case 1:
				map.loadData([
				[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
				[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
				[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
				[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
				[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
				[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
				[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
				[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
				[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
				[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
				[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
				[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
				[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 2, 2, 2, 2, 2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
				[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
				[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
				[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 2, 2, 2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
				[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
				[-1,-1,-1,-1,-1,-1,-1,-1, 2, 2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
				[-1,-1,-1,-1,-1,-1,-1,-1, 2, 2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
				]);

				map.collisionData = [
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
				];


				var tlabel = new timeLabel(120, 0, 350);
				var player = new Player(30, 272, map);
				var npc = new NPC(330, 160, player, scene);
				var goal = new Goal(600, 272, player, scene);
				var swit = new switchPanel(400, 290, player, scene);
				var enemy = new Enemy(320, 282, player);

				var label = new Label('移動(左右) : 十字キー(左右)<br>ジャンプ : Zキー<br>合体 : (仲間の近くで)Xキー')
				label.moveTo(0, 400);

				scene.addChild(tlabel);
				scene.addChild(label);
				scene.addChild(map);
				scene.addChild(npc);
				scene.addChild(swit);
				scene.addChild(goal);
				scene.addChild(enemy);
				scene.addChild(player);


				return scene;
				break;
			case 2:
				map.loadData([
				[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
				[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
				[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
				[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
				[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
				[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
				[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
				[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
				[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
				[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
				[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
				[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
				[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 2, 2, 2, 2, 2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
				[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
				[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
				[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 2, 2, 2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
				[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
				[-1,-1,-1,-1,-1,-1,-1,-1, 2, 2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
				[-1,-1,-1,-1,-1,-1,-1,-1, 2, 2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
				]);

				map.collisionData = [
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
				];


				var tlabel = new timeLabel(120, 0, 350);
				var player = new Player(30, 272, map);
				var npc = new NPC(330, 160, player, scene);
				var goal = new Goal(600, 272, player, scene);
				var swit = new switchPanel(400, 290, player, scene);
				var enemy = new Enemy(0, 0, player);

				var label = new Label('移動(左右) : 十字キー(左右)<br>ジャンプ : 十字キー(上)<br>合体 : (仲間の近くで)Xキー')
				label.moveTo(0, 400);

				scene.addChild(tlabel);
				scene.addChild(label);
				scene.addChild(map);
				scene.addChild(npc);
				scene.addChild(swit);
				scene.addChild(goal);
				//scene.addChild(enemy);
				scene.addChild(player);

				return scene;


			default:

		}
	}


	var createGameOverScene = function() {
		var scene = new Scene();
		var gameOverImage = new Sprite(189, 97);
		gameOverImage.image = game.assets['gameover.png'];
		gameOverImage.x = 150;
		gameOverImage.y = 100;

		var label1 = new Label();
		label1.text = 'Continue?'
		label1.moveTo(180, 250);
		label1.color = 'black';
		label1.font  = "18px 'Consolas', 'Monaco', 'ＭＳ ゴシック'";

		var label2 = new Label();
		label2.text = 'Yes : Zキー   No : Xキー';
		label2.moveTo(120, 280);
		label2.color = 'black';
		label2.font  = "18px 'Consolas', 'Monaco', 'ＭＳ ゴシック'";

		scene.addEventListener(Event.A_BUTTON_DOWN, function() {

			game.replaceScene(createGameScene(posStage));
		});

		scene.addEventListener(Event.B_BUTTON_DOWN, function() {
			game.replaceScene(createTitleScene());
		});


		scene.addChild(gameOverImage);
		scene.addChild(label1);
		scene.addChild(label2);

		return scene;

	}

	var createClearScene = function() {
		var scene = new Scene();
		var clearImage = new Sprite(267, 48);
		clearImage.image = game.assets['clear.png'];
		clearImage.x = 150;
		clearImage.y = 100;
		posStage++; //次のステージに進ませる。

		var label1 = new Label();
		label1.text = 'Tap to Z key.Go to next stage!'
		label1.moveTo(125, 250);
		label1.color = 'black';
		label1.font  = "18px 'Consolas', 'Monaco', 'ＭＳ ゴシック'";

		scene.addEventListener(Event.A_BUTTON_DOWN, function() {

			game.replaceScene(createGameScene(posStage));
		});

		scene.addChild(clearImage);
		scene.addChild(label1);


		return scene;


	}


	var Player = function(x, y, map) {
		var playerImage = new Sprite(32, 32);
		var jumping = false;
		playerImage.image = game.assets['chara1.png'];
		playerImage.x = x;
		playerImage.y = y;
		playerImage.vx = 0;
		playerImage.vy = 0;


		playerImage.addEventListener(Event.ENTER_FRAME, function(){


			if(game.input.right) playerImage.vx += 4;
			if(game.input.left) playerImage.vx -= 4;

			if(NPCFlag) {
				playerImage.frame = 4;
			}
			else {
				if (playerImage.vx != 0) playerImage.frame = playerImage.age % 3;
				else playerImage.frame = 0;
			}

			if(playerImage.vx > 0) playerImage.scaleX = 1;
			if(playerImage.vx < 0) playerImage.scaleX = -1;




			if(playerImage.vx > 1) playerImage.vx -= 2;
			else if(playerImage.vx > 0) playerImage.vx = 0;

			if(playerImage.vx < -1) playerImage.vx += 2;
			else if(playerImage.vx < 0) playerImage.vx = 0;


			playerImage.vx = Math.min(Math.max(playerImage.vx, -5), 5);


			if(playerImage.vx > 0) {
				if((map.hitTest(playerImage.x + playerImage.width - 5, playerImage.y) == false)
				&& (map.hitTest(playerImage.x + playerImage.width - 5, playerImage.y + playerImage.height - 3) == false)) {
					playerImage.x += playerImage.vx;
				}
			}

			else if(playerImage.vx < 0) {
				if((map.hitTest(playerImage.x + 3, playerImage.y) == false) //左上
				&& (map.hitTest(playerImage.x + 3, playerImage.y + playerImage.height - 3) == false )) {//左下
					playerImage.x += playerImage.vx;
				}
			}


			/*if(game.input.down) {
				if((map.hitTest(playerImage.x + 8, playerImage.y + playerImage.height) == false)
				&&(map.hitTest(playerImage.x + playerImage.width - 9, playerImage.y + playerImage.height) == false)) {
					playerImage.y += 4;
			}
		}



			if(game.input.up) {
				if((map.hitTest(playerImage.x + playerImage.width - 7, playerImage.y) == false)
				&& (map.hitTest(playerImage.x +5, playerImage.y) == false)) {
					playerImage.y -= 4;
				}
			}*/


			if(game.input.a && !playerImage.jumping) {
				playerImage.vy = -12;
				playerImage.jumping = true;
			}

			playerImage.vy += 1;

			if(playerImage.vy < 0) {
				if((map.hitTest(playerImage.x + playerImage.width - 7, playerImage.y) == false)
				&& (map.hitTest(playerImage.x +5, playerImage.y) == false)){
					playerImage.y += playerImage.vy;
				}
				else playerImage.vy = 0;
			}

			else if(playerImage.vy > 0) {
				playerImage.vy = Math.min(playerImage.vy, 8)

				if((map.hitTest(playerImage.x + 8, playerImage.y + playerImage.height + playerImage.vy - 1) == false)
				&&(map.hitTest(playerImage.x + playerImage.width - 9, playerImage.y + playerImage.height + playerImage.vy - 1) == false)) {
					playerImage.y += playerImage.vy;
				}

				else if(playerImage.vy > 6) {
					playerImage.y += 5;
					playerImage.vy = 0;
					playerImage.jumping = false;
				}

				else if(playerImage.vy > 4) {
					playerImage.y += 3;
					playerImage.vy = 0;
					playerImage.jumping = false;
				}

				else if(playerImage.vy > 2) {
					playerImage.y += 1;
					playerImage.vy = 0;
					playerImage.jumping = false;
				}

				else {
					playerImage.vy = 0;
					playerImage.jumping = false;
				}



			}




		});

		return playerImage;
	}


	var NPC = function(x, y, player, scene) {
		var NPCImage = new Sprite(32, 32);
		NPCImage.image = game.assets['chara1.png'];
		NPCImage.x = x;
		NPCImage.y = y;
		NPCImage.scaleX = -1;

		NPCImage.frame = 10;
		NPCImage.addEventListener(Event.ENTER_FRAME, function(){
			if(NPCImage.intersect(player) && game.input.b) NPCFlag = true;
			if(NPCFlag) scene.removeChild(NPCImage);


		});
		return NPCImage;
	}

	var Goal = function(x, y, player, scene) {
		var goalImage = new Sprite(32, 32);
		goalImage.image = game.assets['goal.png'];
		goalImage.x = x;
		goalImage.y = y;
		goalImage.addEventListener(Event.ENTER_FRAME, function(){
			if(switchFlag) goalImage.frame = 1;
			if(switchFlag && goalImage.intersect(player)) game.replaceScene(createClearScene());
		});

		return goalImage;

	}

	var switchPanel = function(x, y, player, scene) {
		var switchImage = new Sprite(16, 16);
		switchImage.image = game.assets['swi.png'];
		switchImage.x = x;
		switchImage.y = y;
		switchImage.addEventListener(Event.ENTER_FRAME, function(){
			if(NPCFlag && switchImage.intersect(player)) switchFlag = true;
			if(switchFlag) scene.removeChild(switchImage);
		});
		return switchImage;
	}

	var Enemy = function(x, y, player) {
		var enemyImage = new Sprite(32, 32);
		enemyImage.image = game.assets['chara6.png'];
		enemyImage.x = x;
		enemyImage.y = y;
		enemyImage.addEventListener(Event.ENTER_FRAME, function(){
			if(enemyImage.intersect(player)) game.replaceScene(createGameOverScene());
		});

		return enemyImage;
	}


	game.start();
}