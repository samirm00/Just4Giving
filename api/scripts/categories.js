// create categories 6
const createCategories6 = async () => {
    return await Categories.findOrCreate({
        where: {
            category_name: 'Sport',
            category_image: 'sport.png',
            categories_id: 6,
        },
    });
};
createCategories6().then(() => {
    process.exit();
});

// create categories 7
const createCategories7 = async () => {
    return await Categories.findOrCreate({
        where: {
            category_name: 'Books',
            category_image: 'books.png',
            categories_id: 7,
        },
    });
};
createCategories7().then(() => {
    process.exit();
});

// create categories 8
const createCategories8 = async () => {
    return await Categories.findOrCreate({
        where: {
            category_name: 'Other',
            category_image: 'other.png',
            categories_id: 8,
        },
    });
};
createCategories8().then(() => {
    process.exit();
});
