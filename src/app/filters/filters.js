// TODO: Don't forget to format your code
export default class Filters {
    constructor(){}

    uniqByProperty(array, property) {
        // TODO: Please use ES2015 features e.g.
        // const arr = [1, 2, 2, 3, 4],
        //     filteredValues = arr.filter(el => el > 1),
        //     uniqValues = new Set([...filteredValues])
        //
        // return [...uniqValues]
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