const { age } = require('../../lib/util')
const { date } = require('../../lib/util')
const teacher = require("../models/teacher")

module.exports = {
    index(req, res) {
        let { filter } = req.query
        if (filter) {
            teacher.findBy(filter, function(teachers) {
                const teachersformated = []
                for (i in teachers) {
                    const teacher = {
                        ...teachers[i],
                        areas: teachers[i].areas.split(",")
                    }
                    teachersformated.push(teacher)
                }
                return res.render("teachers/index", { teachers: teachersformated })
            })
        } else {
            teacher.all(function(teachers) {
                const teachersformated = []
                for (i in teachers) {
                    const teacher = {
                        ...teachers[i],
                        areas: teachers[i].areas.split(",")
                    }
                    teachersformated.push(teacher)
                }
                return res.render("teachers/index", { teachers: teachersformated })
            })
        }

    },
    post(req, res) {
        const keys = Object.keys(req.body)
        for (key of keys) {
            if (req.body[key] == "") {
                return res.send("por favor validar todos os campos")
            }
        }
        teacher.create(req.body, function(teacher) {
            return res.redirect(`/teachers/${teacher.id}`)
        })
    },
    show(req, res) {
        const { id } = req.params
        teacher.find(id, function(teacher) {
            if (!teacher) return res.send("Professor não encontrado")
            teacher.age = age(teacher.birth_date)
            teacher.created_at = date(teacher.create_at).format
            teacher.degree = teacher.education_level
            teacher.typeofclass = teacher.class_type
            teacher.areas = teacher.areas.split(',')
            return res.render("teachers/show", { teacher })
        })
    },
    edit(req, res) {
        const { id } = req.params
        teacher.find(id, function(teacher) {
            if (!teacher) return res.send("instrutor não encontrado")
            teacher.birth = date(teacher.birth_date).iso
            teacher.degree = teacher.education_level
            teacher.typeofclass = teacher.class_type
            return res.render("teachers/edit", { teacher })
        })
    },
    put(req, res) {
        const { id } = req.body
        teacher.update(req.body, function() {
            return res.redirect(`/teachers/${id}`)
        })
    },
    delete(req, res) {
        const { id } = req.body
        teacher.delete(id, function() {
            return res.redirect("/teachers")
        })
    }
}