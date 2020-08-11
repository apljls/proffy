const subjects =[
    "Artes",
    "Biologia",
    "Ciências",
    "Educação Física",
    "Física",
    "Geografia",
    "História",
    "Matemática",
    "Portugues",
    "Quimica",
]

const weekdays = [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sabado",
]

function getSubject(subject){
    const position = +subject-1
    return subjects[position]
}

function convertHoursToMinute(time) {
    const [hour, minutes] = time.split(":")
    return Number((hour * 60) + minutes)
}

module.exports = {subjects,weekdays, getSubject,convertHoursToMinute}