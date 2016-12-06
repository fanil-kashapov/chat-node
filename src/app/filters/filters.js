export default class Filters {
    constructor(){}

    uniqByProperty(array, property) {
        var processed = [];
        for (var i=array.length-1; i>=0; i--) {
            if (processed.indexOf(array[i][property])<0) {
                processed.push(array[i][property]);
            } else {
                array.splice(i, 1);
            }
        }
        return array;
    }

    sortByDate(item) {
        var date = new Date(item.date);
        return date;
    }

    static FiltersFactory() {
        return new Filters();
    }
}