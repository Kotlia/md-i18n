#!/usr/bin/env node

import fs from 'fs'
import path from "path";
import Deepl from 'deepl-scraper'
import Draftlog from 'draftlog'
import yargs from 'yargs'

Draftlog(console)

const root = path.resolve(path.resolve(), "docs")
const out = path.resolve(path.resolve(), "i18n")

fs.mkdir(out, () => {})

const argv = yargs
    .option('target', {
        alias: 't',
        description: 'Language for word/sentence to be translated',
        demandOption: true
    })
    .option('source', {
        alias: 's',
        description: 'Word/sentence original language',
        default: 'auto'
    })
    .help()
    .argv

fs.readdir(root, async (e, files) => {
    let draftList = []
    files.forEach(file => {
        draftList.push(
            console.draft(file)
        )
    })
    let n = 0
    for await (const file of files) {
        let res = []
        await new Promise(resolve => {
            fs.readFile(path.resolve(`${root}/${file}`), async (e, data) => {
                let on = true
                let i = 0
                const s = (await data).toString().split('\r\n')

                draftList[n](`${file}: [${i}/${s.length}]`)

                for (const it of await s) {
                    if (it.includes('```')) {
                        on = !on;
                        res.push(it)
                    } else if (
                        it.includesAtLeast(
                            [
                                "id: ",
                                "title: ",
                                "---",
                            ]
                        ) || it === '' || !on
                    ) {
                        res.push(it)
                    } else {
                        res.push((await Deepl.translate(it, argv.source, argv.target)).target.translation)
                    }
                    i++
                    draftList[n](`${file}: [${i}/${s.length}]`)
                }
                fs.writeFile(path.resolve(`${out}/${file}`), res.join('\n'), (e) => {
                    n++
                    resolve()
                })
            })
        })
    }
})

String.prototype.includesAtLeast = function(arr) {
    let r = false
    arr.forEach(it => {
        if (this.includes(it)) { r = true }
    })
    return r
}
