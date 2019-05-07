new Vue({
    el: '#pole',
    data: {
        blocks: [{id:'el', ref:'el', item_color:''}],
        color: ''

    },
    //заполняем клеточки шахматной доски при старте программы
    created () {
        this.chess();
    },

    methods:{
        // метод для отрисовки шахматной доски
        chess(){
            for (var i = 0; i < 64; i++){
                // формула для вычисления цвета ячейки по ее номеру от 0 до 63
                var num_col=(((((i) / 8) & 1)+(((i) % 8) & 1)) & 1);
                // 0 - белый, 1 - черный
                var color = num_col == 0 ? 'white' : 'black';
                this.blocks[i] = {id:('el' + i), item_color:color};
            }
        },
        //обработчик нажатия на клетку поля
        action(){
            //отрисовываем пустое шахматное поле
            this.chess();
            //получаем номер клетки на которую нажали
            var num_item = Number(event.target.id.substr(2)) + 1;
            // устанавливаем синий цвет для этой ячейки
            Vue.set(this.blocks, (num_item-1), {id:'el+(num_item-1)', item_color:'blue'});
            // по порядковому номеру ячейки расчитываем ее координаты x и y
            var x = (num_item % 8) > 0 ? (num_item % 8) : 8;
            var y = 8 - Math.floor((num_item - 1) / 8);
            // возможные варианы хода коня
            var posible_movies = [[-1, -2], [-2, -1], [-2, 1], [1, -2], [-1, 2], [2, -1], [1, 2], [2, 1]];
            // расчитываем варианты ходов чтобы не выйти за пределы поля и записываем в массив result
            var result = [];
            for(let hod of posible_movies){
                var xi = x + hod[0];
                var yi = y + hod[1];
                if(xi>0 && xi<9 && yi>0 && yi<9){
                    var num_res = ((9-yi)*8-8+xi)-1;
                    result.push(num_res);
                }
            }
            //отрисовываем возможные ходы коня зеленым цветом
            for(num of result){
                Vue.set(this.blocks, num, {id:'el+num', item_color:'green'});
            }
        }
    }
});