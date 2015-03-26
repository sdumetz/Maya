# Maya

Maya Project

## Draw reference

Map coordinates :

              (0.0)
          (0.1)   (1.0)
      (0.2)   (1.1)   (2.0)
          (1.2)   (2.1)
              (2.2)

With ```xt,yt``` map coordinates, ```x,y``` page coordinates and ```s``` the tile base size (tiles are a losange of s,s/2) :
    x = s*xt/2 - s*yt/2
    y = s*xt/4 + s*yt/4

Invert conversion :

    Base calculation :
      s*xt/2 = x +s*yt/2
      s*yt/4 = y + s*xt/4
    Simplification :
      xt = 2*x/s + yt
      yt = 4*y/s -xt
    So for x :
      xt = 2x/s + 4y/s -xt
      xt = x/s + 2y/s
    for y :
      yt = 4*y/s - ( x/s + 2y/s )
      yt = 4*y/s - x/s -2y/s
      yt = 2y/s -x/s

Final result :
    xt = x/s + 2y/s
    yt = 2y/s -x/s

Example

    with tile (2,3), size = 100
      xt = 2
      yt = 3

      x = 2*100*2 -2*100*3
        = -200

      y = 100*2 +100*3
        = 500
    Invert operation :
      xt = -200/400 + 500/200
         = 2

      yt = 500/200 +200/400
         = 3



## Server side model

tiles are represented using a document db. A tile is :

    x
    y
    content


## Client side model

The client request necessary tiles with the "tiles" event. Necessary tiles are calculated as :

On start : we create the tiles Bmps

/ on move, client requests tiles images. If they doesn't exists, empty tiles are created, and tile coordinates are added to model request list.
