/* monmonwars.js
*
*  Game Pertarungan dengan metode flip-coin.
*  Terdapat 3 monster masing masing mempunyai elemen berbeda
*  yang dapat dipilih untuk menemani petualangan di dunia MONMON.
*  Masing-masing elemen yang berbeda dapat saling kuat dan melemahkan.
*  Jadi pikirkan baik baik sebelum menentukan pilihan monstermu.
*  http://jsbin.com/fozoxetobu/1/edit?js,console
*
*  Faris Widyantho
*  Miracle Fox
*  2017
*/


//functioning log message alert & console
function logs(mes){
  alert(mes);
  console.log(mes);
  document.write(mes + "<br />");
}

//intro
logs("Selamat datang di MONMON WARS!\n");
logs("Pilih karakter kamu untuk memulai petualangan\npemilihan karakter kamu menentukan segalanya,\npikirkan baik baik sebelum menentukan pilihanmu.\n ");

//set value monster & db array
var monster = 0;
var pilih;
var monsterName = [
  ["1", "Lavamon", "Api", "Air"],
  ["2", "Watermon", "Air", "Angin"],
  ["3", "Tornadomon", "Angin", "Api"]
];

//intro pilihan karakter
function introChar(monster){
  switch (monster){
    case "1":
      return (monsterName[0][1] + ", Element: " + monsterName[0][2]);
      break;
    case "2":
      return (monsterName[1][1] + ", Element: " + monsterName[1][2]);
      break;
    case "3":
      return (monsterName[2][1] + ", Element: " + monsterName[2][2]);
      break;
    default:
      return "pilihan salah";
      break;
  }
}

monster = window.prompt("Ketik angka. untuk memilih karakter\n\n1. " + introChar("1") +"\n2. "+ introChar("2") +"\n3. "+ introChar("3") +"\n ","1");

//loop kalau pilihan tidak ada dalam list
if (monster>3 || monster<1){
  logs("Kamu harus memilih monstermu\n");

}
else{
  //intro character
  logs("Karakter Pilihanmu: \n"+ introChar(monster)+ "\n ");
  logs("Namun sebelum kamu berpetualang, kamu harus mengalahkan monster disini");


  //generate enemy random 1~3
  var enemy = Math.floor(Math.random() * 3) + 1 ;
  logs("Musuhmu adalah \n"+ introChar(enemy.toString())+ "\n ");
  logs("Selamat Bertarung!!");

  //calculate weakness point
  var weak;
  //monster 1 weak 2, strong 3
  if(monster == "1" && enemy == 2){
    weak = -1;
  } else if (monster == "1" && enemy == 3){
    weak = 1;
  }
  //monster 2 weak 3, strong 1
  else if(monster == "2" && enemy == 3){
    weak = -1;
  } else if (monster == "2" && enemy == 1){
    weak = 1;
  }
  //monster 3 weak 1, strong 2
  else if(monster == "3" && enemy == 1){
    weak = -1;
  } else if (monster == "3" && enemy == 2){
    weak = 1;
  } else {
    weak = 0;
  }


  //chose action 1=fight, 2=run
  var action = window.prompt("Ketik angka. untuk memilih \n\n1. FIGHT\n2. RUN\n ","1");
  var pointMonster = 0;
  var pointEnemy = 0;


  //mode 1= FIGHT, 2=RUN
  function actionMode(action, weak, monster){

    //FIGHT!
    if(action == "1"){
      logs("Kamu memilih fight\n\nRules: Menangkan coin flip dan kamu akan menyerang.")

      var coin, rands, points;

      var i =1;
        points = rounds(coin,rands,0,0,i);
        pointMonster += points[0]
        pointEnemy += points[1]

      i = i+1;
        points = rounds(coin,rands,0,0,i);
        pointMonster += points[0]
        pointEnemy += points[1]

      i = i+1;
        points = rounds(coin,rands,0,0,i);
        pointMonster += points[0]
        pointEnemy += points[1]

      if(pointMonster>pointEnemy){
        logs("SELAMAT KAMU JUARANYA!");
      } else if(pointMonster<pointEnemy){
        logs("KAMU KALAH DALAM PERTARUNGAN");
      } else{
        logs("KAMU DAN MUSUHMU SAMA KUAT. SALAM PERDAMAIAN!");
      }

    }


    //RUN
    if(action == "2"){
      //Siapa kamu? xxxCUPUmon??? HAHAHAHA
      var lengCupu = monsterName[Number(monster)-1][1].length-3;
      var namaAsli = monsterName[Number(monster)-1][1];
      var namaCupu = [];
      for(var j = namaAsli.length-4; j>=0; j--){
        if(j == namaAsli.length-4){
          namaCupu.push(namaAsli[j].toUpperCase());
        }
        else{
          namaCupu.push(namaAsli[j].toLowerCase());
        }
      }

      logs("Hah?? Lari? Siapa namamu? " + namaAsli + "?? HAHAHA.. mulai sekarang aku panggil kau "+ namaCupu.join("") +"CUPUmon ?? HAHAHAHAHAHA");

    }

  }

  function chooseCoin(i){
    var coin = window.prompt("ROUND "+ i +"/3" +"\n\nKetik angka. untuk memilih:\n1. HEAD\n2. TAILS\n ","1");
    return coin;
  }

  //ROUND X return points masing masing monster dan enemy
  var rounds = function(coin,rands,pointMonster,pointEnemy,i){
    console.log("ROUND " + i + "/3:");
    //fight, flip coin
    coin = chooseCoin(i);
    rands = Math.floor(Math.random() * 2) + 1;

    if(rands==1){
      logs("HEAD!!");
    } else if(rands==2){
      logs("TAILS!!");
    }

    /*
    console.log("coin: "+ coin);
    console.log("rands: "+ rands);
    */
    if(coin == rands.toString()){
      //menang = serang = +1
      pointMonster = pointMonster + 1;
      pointEnemy = pointEnemy - 1;
      //Serangan yang sangat kejam!!
      logs("Giliranmu Menyerang!!\n Musuh terkapar, serangan yang sangat kejam");

    }
    //kalah = diserang = -1
    else{
      pointMonster = pointMonster - 1;
      pointEnemy = pointEnemy + 1;
      //Pertahanan mu hancur seketika
      logs("Musuh menjadi gila dan menyerangmu!\nJangan menyerah, meskipun pertahananmu hancur!!");

    }

    return [pointMonster, pointEnemy];
  }


  //ACTION NOW!!
  actionMode(action, weak, monster);
}

if(monster==0){
  logs("Kamu tidak memilih monster. Tidak dapat melanjutkan petualangan.");
}

//outro
logs("Terimakasih sudah bermain \n\nMONMON WARS 2017\n\n");
