const Database = require('./db')
const createProffy = require('./createProffy')

Database.then( async(db)=>{
    //Inserir dados
    proffyValue = {
        name: 'Eron',
        avatar: 'https://avatars3.githubusercontent.com/u/65095622?s=460&u=4de96ef63773e618b312f34f6de2dadbcdf9d991&v=4',
        whatsapp: '119988774455',
        bio: 'zica do baile',
        // name: 'Gustavo Guanabara',
        // avatar: 'https://avatars0.githubusercontent.com/u/8683378?s=400&u=01b06a154f04dadaa4e4131497fa2442e6323cbc&v=4',
        // whatsapp: '119988774455',
        // bio: 'Instrutor de várias coisas',
    }

    classValue ={
        subject: 1,
        coast: '50',
        //proffy_id: ''
    }

    classScheduleValues = [
        //ClassId virá pelo banco após cadastrar a aula
        {
            weekday:1,
            time_from: 720,
            time_to: 1220,
        },
        {
            weekday:0,
            time_from: 520,
            time_to: 720,
        },
    ]
    
    //await createProffy(db, {proffyValue, classValue, classScheduleValues})
    
    
    //Consultar dados
    //const selectedProffys = await db.all('Select * from proffys')
    //console.log(selectedProffys)


    const selectClassesAndProffys =  await db.all(`
        SELECT classes.*, proffys.* 
        FROM proffys 
        JOIN classes ON (proffys.id = classes.proffys_id)
        WHERE classes.proffys_id = 2 ;
    `)

    // console.log(selectClassesAndProffys)

    const selectClassesSchedules = await db.all(`
        select classes_schedule.*
        from classes_schedule
        where classes_schedule.class_ID = 1
        and classes_schedule.weekday =  0
        and classes_schedule.time_from <= 720
        and classes_schedule.time_to <= 1500
    `)

    console.log(selectClassesSchedules)

})