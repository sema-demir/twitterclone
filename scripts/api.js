//apikey
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "e4f5ce1768msh41219fbd34033ffp143b1bjsn94b55b3d9b12",
    "X-RapidAPI-Host": "twitter-api45.p.rapidapi.com",
  },
};

export default class API {

  // kullancıı isminden hesap bilgilerine ulas
  static async getUser(username) {

    //verileri al
    const res = await fetch(
      `https://twitter-api45.p.rapidapi.com/screenname.php?screenname=${username}`,
      options
    );

    //json verisini js verisine çevir
    const data = await res.json();

    // veriyi gönder
    return data;
  }
  //tiwitleri al
  static getTweets() {}
}
