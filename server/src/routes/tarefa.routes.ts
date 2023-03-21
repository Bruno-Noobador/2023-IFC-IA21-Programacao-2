import { Router } from "express"
import database from "../database"

const router = Router()

router.get("/", async (req, res) => {
  console.log("READED ITENS")
  const db = await database()
  const result = await db.all('SELECT * FROM todo')
  res.json(result)
})

router.get("/:id", async (req, res) => {
  console.log("READ ITEM")
  const db = await database()
  const result = await db.all('SELECT * FROM todo WHERE id=?', [req.params.id])
  res.json(result)
})

router.post("/", async (req, res) => {
  console.log("CREATED NEW ITEM")
  const db = await database()
  const result = await db.run('INSERT INTO todo(texto) VALUES(?)', [req.body.texto])
  res.json({ id: result.lastID })
})

router.put("/", async (req, res) => {
  console.log("UPDATED ALL ITEMS")
  const db = await database()
  const result = await db.run('UPDATE todo SET done=?, texto=?', [req.body.done, req.body.texto])
  res.json({ id: result.lastID })
})

router.patch("/:id", async (req, res) => {
  console.log("UPDATED ITEM")
  const db = await database()
  const result = await db.run(`UPDATE todo SET done=?, texto=? WHERE id=?`, [req.body.done, req.body.texto, req.params.id])
  res.json({ id: result.lastID })
})

router.delete("/:id", async (req, res) => { 
  console.log("DELETED ITEM")
  const db = await database()
  const result = await db.run('DELETE FROM todo WHERE id=?', [req.params.id])
  res.json({ id: result.lastID })
})

export default router