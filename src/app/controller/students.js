const student = require("../models/student")
const { date } = require("../../lib/util")

module.exports = {
    index(req, res) {
        let { filter } = req.query
        if (filter) {
            student.findBy(filter, function(students) {
                return res.render("students/index", { students, filter })
            })
        } else {
            student.all(function(students) {
                return res.render("students/index", { students })
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
        student.create(req.body, function(student) {
            return res.redirect(`/students/${student.id}`)
        })
    },
    show(req, res) {
        const { id } = req.params
        student.find(id, function(student) {
            if (!student) return res.send("instrutor não encontrado")
            student.birth = date(student.birth).format
            student.create_at = date(student.created_at).format
            return res.render("students/show", { student })
        })
    },
    edit(req, res) {
        const { id } = req.params
        student.find(id, function(student) {
            if (!student) return res.send("instrutor não encontrado")
            student.birth = date(student.birth).iso
            return res.render("students/edit", { student })
        })
        return
    },
    put(req, res) {
        const { id } = req.body
        student.update(req.body, function() {
            return res.redirect(`/students/${id}`)
        })
        return
    },
    delete(req, res) {
        const { id } = req.body
        student.delete(id, function() {
            return res.redirect("/students")
        })
    }
}