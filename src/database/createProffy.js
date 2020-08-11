module.exports = async function(db, {proffyValue, classValue, classScheduleValues}){
    //Inserir dados na tabela proffys
    console.log("proffyValue: ",proffyValue)
    const insertedProffy = await db.run(`
        INSERT INTO proffys (
            name,
            avatar,
            whatsapp,
            bio
        ) VALUES (
            "${proffyValue.name}",
            "${proffyValue.avatar}",
            "${proffyValue.whatsapp}",
            "${proffyValue.bio}"
        );
    `)
    const proffys_id = insertedProffy.lastID

    //inserir dados na tabela classes
    const insetedClass = await db.run(`
        INSERT INTO classes(
            subject,
            coast,
            proffys_id
        ) VALUES (
            "${classValue.subject}",
            "${classValue.coast}",
            "${proffys_id}"
        );
    `)
    const class_id = insetedClass.lastID

    // inserir dados na tabela class_schedule
    const insertedAllClassScheduleValues = classScheduleValues.map((classScheduleValue) => {
        return db.run(`
            INSERT INTO classes_schedule (
                class_id,
                weekday,
                time_from,
                time_to
            ) VALUES (
                "${class_id}",
                "${classScheduleValue.weekday}",
                "${classScheduleValue.time_from}",
                "${classScheduleValue.time_to}"
            );
        `)
    })

    await Promise.all(insertedAllClassScheduleValues)
}