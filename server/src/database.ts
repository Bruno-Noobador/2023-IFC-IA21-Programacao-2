import sqlite3 from 'sqlite3'
import { Database, open } from 'sqlite'

let _db: Database<any> | null = null

export default async function() {
  if (_db) 
    return _db as Database<any> 

  const db = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database
  })

  await db.exec(`
    CREATE TABLE IF NOT EXISTS todo (
      id    INTEGER PRIMARY KEY AUTOINCREMENT,
      texto TEXT    NOT NULL,
      done  BOOLEAN DEFAULT FALSE
    )
  `)

  _db = db

  return _db
}