export default class Song {
  constructor ({id, mid, singer, name, album, image}) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    // this.duration = duration
    this.image = image
    // this.url = url
  }
}

export function createSong (musicData) {
  return new Song({
    id: musicData.id,
    mid: musicData.al.id,
    singer: fitterSinger(musicData.ar),
    name: musicData.name,
    album: musicData.al.name,
    image: musicData.al.picUrl
  })
}

function fitterSinger (singer) {
  let ret = []
  if (!singer) {
    return ''
  }

  singer.forEach((s) => {
    ret.push(s.name)
  })
  return ret.join('/')
}
