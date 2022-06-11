
        const X = 90;
        const Y = 120;
        generateGrid()
        const grid = document.getElementById('grid').children;

        const matrix = [];

        let pathColor = '#08f';

        let visitedColor = false;

        function generateGrid() {
            for (let y = 0; y < Y; y++) {
                const node = document.createElement('p');
                document.getElementById('grid').appendChild(node);
                for (let x = 0; x < X; x++) {
                    const node = document.createElement('span');
                    document.getElementById('grid').children[y].appendChild(node);
                }
            }
        }

        function generateMaze() {
            for (let y = 0; y < Y; y++) {
                matrix.push([]);
                for (let x = 0; x < X; x++) {
                    matrix[y].push(Math.random() > .7 ? -1 : 0)
                }
            }
        }

        function draw() {
            for (let y = 0; y < Y; y++) {
                for (let x = 0; x < X; x++) {
                    const elem = grid[y].children[x];
                    if(y==0 && x==(~~X/2)){
                         elem.style.background = '#c5c'
                        continue;
                        }
                    const m = matrix[y][x];
                    //elem.innerHTML = m;
                    if (!m)
                        elem.style.background = '#000';
                    else if (m == -1)
                        elem.style.background = '#fff';
                    else if (m == -2)
                        elem.style.background = '#0af';
                    else if (m == level)
                        elem.style.background = pathColor;
                    else if (m + 1 == level)
                        elem.style.background = pathColor + 'c';
                    else if (m + 2 == level)
                        elem.style.background = pathColor + 'a';
                    else if (m + 3 == level)
                        elem.style.background = pathColor + '9';
                    else if (m + 4 == level)
                        elem.style.background = pathColor + '7';
                    else if (m + 5 == level)
                        elem.style.background = pathColor + '5';
                    else {
                        //matrix[y][x] = level
                        //elem.style.background  = pathColor+m;
                        if(visitedColor)
                        elem.style.background = '#fd0f';
                        else
                        elem.style.background = '#000';
                    }
                }
            }

        }

        generateMaze()
        draw(-1)

        let final = { x: X - 1, y: Y - 1 };
        let start = { x: ~~X/2, y: 0 };

        let level = 1;

        async function bfs(start) {
            let queue = [];
            let childQueue = [];
            queue.push(start);
            await search()
            async function search() {

                if (!(queue.length || childQueue.length)) return;
                //await new Promise((r,_r)=>{setTimeout(r,0)});
                const curr = queue.shift();
                if (await process(curr)) return true;
                const children = getChild(curr);
                for (let i = 0; i < children.length; i++) {
                    const child = children[i]
                    childQueue.push(child)
                    //beep()
                    matrix[child.y][child.x] = level;
                }
                if (!queue.length) {
                    // let t = Date.now() +100;
                    //while(Date.now() < t) ;
                    await new Promise((r, _r) => { setTimeout(r, 20) });
                    draw()
                    level++;
                    queue = childQueue;
                    childQueue = [];
                }
                if(await search())
               drawPath(final)
                // draw()
                return;
                // level += 100
                //matrix[node.y][node.x] = -2;
            }
        }

        
       async function process(node) {
            if ( final.y == node.y) {
                final = node
                return true;
            };
            matrix[node.y][node.x] = level;
            
        }
        
      async function drawPath(node){
            matrix[node.y][node.x] = -2;
            if(start.x == node.x && start.y == node.y) return
            const nextNode = getChildForPath(node)
            await new Promise((r, _r) => { setTimeout(r, 0) });
            if(!nextNode) return;
            drawPath(nextNode);
            if(Date.now()%(Math.round(Math.random()*20))==0)
            draw()
        }
        
        function getChild({ x, y }) {
            let res = [];
            if (y && !matrix[y - 1][x]) res.push({ x: x, y: y - 1 })
            if (x && !matrix[y][x - 1]) res.push({ x: x - 1, y: y })
            if (y < Y - 1 && !matrix[y + 1][x]) res.push({ x: x, y: y + 1 })
            if (x < X - 1 && !matrix[y][x + 1]) res.push({ x: x + 1, y: y })
            return res
        }

        function getChildForPath({ x, y }) {
            let res = [];
            if (y && matrix[y - 1][x]>0) res.push({ x: x, y: y - 1 })
            if (x && matrix[y][x - 1]>0) res.push({ x: x - 1, y: y })
            if (y < Y - 1 && matrix[y + 1][x]>0) res.push({ x: x, y: y + 1 })
            if (x < X - 1 && matrix[y][x + 1]>0) res.push({ x: x + 1, y: y })
            let min = res[0];
            res.forEach((n,i)=>{
                if(matrix[min.y][min.x]>matrix[n.y][n.x])
                min = n;
            })
            return min;
        }

        function changeColor(elem){
            visitedColor = elem.checked;
            draw()
        }



        bfs(start)







   