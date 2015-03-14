//taille de la grille
grid_size = 10;
//taille des cases
tile_size = 100;

//définition des origines
var x0 = tile_size*grid_size;
var y0 = 0;



function create_img(L, C, src){
x = (C - L)*tile_size + x0 ;
y = (1+0.5*(C + L))*tile_size+y0;

document.body.innerHTML = document.body.innerHTML + "<img src="+ src + " style='position:absolute;left:" + x + ";top:" + y+ "'></img>";
};

function hello(){


// afficher les 25 cases / moitié haute
for (i=1;i<=grid_size;i++){
for (j=1;j<=i;j++){	
L = i-j+1;
C = j;
if(Math.random()>0.5){src = "test.png";}else{src = "mine.png"};
create_img(L, C, src);
}
}

for (i=1;i<=grid_size-1;i++){
for (j=1;j<=grid_size-i;j++){
C = grid_size-j+1;
L = i+j;
console.log(C);
console.log(L);

if(Math.random()>0.5){src = "test.png";}else{src = "mine.png"};
create_img(L, C, src);
}
}

};
