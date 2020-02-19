async function feed(_, props, context) {
    const count = await context.prisma
        .linksConnection({
            where: {
                OR: [
                    { description_contains: props.filter },
                    { url_contains: props.filter },
                ],
            },
        })
        .aggregate()
        .count();

    const links = await context.prisma.links({
        where: {
            OR: [
                { description_contains: props.filter },
                { url_contains: props.filter },
            ],
        },
        skip: props.skip,
        first: props.first,
        orderBy: props.orderBy,
    });

    return {
        count,
        links,
    };
}

module.exports = {
    feed,
};
