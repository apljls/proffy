// const proffys = [
//     {
//         name:"Anderson Lima",
//         avatar:"https://avatars2.githubusercontent.com/u/60048604?s=460&u=a1cd1e01d13c7473c338646276548a0ab85b7cc8&v=4",
//         whatsapp:"11976459017",
//         bio:"Praticante da Arte suave a mais de uma decada, aluno exemplar, atleta nas horas vagas. BlackBelt com experiencia, posição predileta: half Guard (Meia Guarda)",
//         subject:"Jiu Jitsu",
//         coast:"2500",
//         weekday: [0],
//         time_from:[2500],
//         time_to:[2800]
//     },

// ]

// const subjects =[
//     "Artes",
//     "Biologia",
//     "Ciências",
//     "Educação Física",
//     "Física",
//     "Geografia",
//     "História",
//     "Matemática",
//     "Portugues",
//     "Quimica",
// ]

// const weekdays = [
//     "Domingo",
//     "Segunda",
//     "Terça",
//     "Quarta",
//     "Quinta",
//     "Sexta",
//     "Sabado",
// ]

// function getSubject(subject){
//     const position = +subject-1
//     return subjects[position]
// }

const Database = require('./database/db')
const {subjects,weekdays, getSubject, convertHoursToMinute} = require('./util/format')


function pageLanding(request, response){
    // return response.sendFile(__dirname + "/views/index.html") //after nunJucks, use response.render
    return response.render("index.html")
}

async function pageStudy(request, response){
    const filters = request.query

    if (!filters.subject || !filters.weekday || !filters.time){
        return response.render("study.html", {filters, subjects, weekdays})
    }

    //Converter horas em minuto
    const timeToMinutes = convertHoursToMinute(filters.time)

    const query = `
        SELECT classes.*, proffys.* 
         FROM proffys 
         JOIN classes ON (proffys.id = classes.proffys_id)
         WHERE EXISTS (
             select classes_schedule.*
             from classes_schedule
             where classes_schedule.class_ID = classes.id
                 and classes_schedule.weekday =  ${filters.weekday}
                 and classes_schedule.time_from <= ${timeToMinutes}
                 and classes_schedule.time_to <= ${timeToMinutes}
         )
         AND classes.subject = ${filters.subject} ;
     `
     
     // Caso haja erro durante processo no banco
     try {
         const db = await Database
         const proffys = await db.all(query)

         proffys.map((proffy)=>{
             proffy.subject = getSubject(proffy.subject)
         })

        //return response.sendFile(__dirname + "/views/study.html") //after nunJucks, use response.render
        return response.render("study.html", {proffys, filters, subjects, weekdays})
     } catch (error) {
         console.log(error)     
     }
}

function pageGiveClasses(request, response){
    //return response.sendFile(__dirname + "/views/give-classes.html")     return response.render("index.html")
    return response.render("give-classes.html", {subjects, weekdays})
}

async function saveClasses (request, response){
    const data = request.body
    const createProffy = require('./database/createProffy')
    // const isNotEmpty = Object.keys(data).length > 0

    // if(isNotEmpty){
    //     data.subject = getSubject(data.subject)
        
    //     proffys.push(data)
    // }

    const proffyValue = {
        name : request.body.name,
        avatar : request.body.avatar,
        whatsapp : request.body.whatsapp,
        bio : request.body.bio
    }

    console.log("proffyValue criada na funcao saveClasses: " , proffyValue)

    const classValue = {
        subject : request.body.subject,
        coast : request.body.coast
    }

    const classScheduleValues = request.body.weekday.map((value,index) => {
        return {
            weekday: value.weekday,
            time_from : convertHoursToMinute(request.body.time_from[index]) ,
            time_to :convertHoursToMinute( request.body.time_to[index])
        }
    })

    try {
        const db = await Database
        console.log("To dentro do try")
        await createProffy(db,proffyValue,classValue, classScheduleValues)

        let queryString = "?subject=" + request.body.subject
        queryString += "&weekday" + request.body.weekday[0]
        queryString += "&time" + request.body.time_from[0]

        return response.redirect("/study"+queryString)
    } catch (error) {
        console.log(error)
    }
}

module.exports = {pageLanding, pageStudy, pageGiveClasses, saveClasses}