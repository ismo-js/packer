import * as p from "path"
import * as fs from "fs"
import * as asc from "async"
import g from "gulp"

const O = Object

const opts = {
  follow: true, // follow symlinks
}

async function getSubdirs(dir) {
  const subfiles = await new Promise((rsv, rjc)=>
    fs.readdir(dir, (err, files)=> !err ? rsv(files) : rjc(err))
  )
  const stats = await asc.map(subfiles, fs.stat)
  return subfiles.filter((e, i)=> stats[i].isDirectory())
}

export default async function pack(cwd) {
  const subsPath = p.join(cwd, "subs")
  const subsDirs = await getSubdirs(subsPath)

  //const curOpts = O.assign({cwd}, opts)
  await g
    .src("subs/*/package.yaml", curOpts)
    .pipe()
    .dest("package.json", curOpts)
}