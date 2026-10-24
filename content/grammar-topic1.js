/* Topic 01 — British English pronunciation, phonemes and spelling; eight original lessons. */
(function(g){"use strict";
const raw=[
{id:"vowels-i",title:"Nguyên âm ngắn /ɪ/ và dài /iː/",meaning:"Trong giọng Anh-Anh chuẩn, /ɪ/ (ship, sit) và /iː/ (sheep, seat) là hai âm vị khác nhau. Không suy ra độ dài chỉ từ số chữ cái.",form:"/ɪ/: ship /ʃɪp/, sit /sɪt/; /iː/: sheep /ʃiːp/, seat /siːt/",core:"Nghe và quan sát phiên âm IPA: /ɪ/ ngắn, lưỡi thấp hơn /iː/; /iː/ có độ dài và chất lượng âm khác /ɪ/.",mistake:"Không đọc ship thành sheep hoặc bit thành beat chỉ vì cùng chữ i/e.",choices:["/ɪ/","/iː/","/e/","/æ/"],rows:[
["ship","/ɪ/","ship /ʃɪp/ đối lập với sheep /ʃiːp/; chữ i ở ship cho /ɪ/."],
["sheep","/iː/","sheep /ʃiːp/ có âm /iː/ kéo dài, khác ship /ʃɪp/."],
["sit","/ɪ/","sit /sɪt/ có /ɪ/, còn seat /siːt/ có /iː/."],
["seat","/iː/","seat /siːt/ có /iː/, không phải /ɪ/ của sit."],
["bit","/ɪ/","bit /bɪt/ là âm ngắn, khác beat /biːt/."],
["beat","/iː/","beat /biːt/ mang /iː/, khác bit /bɪt/."],
["fill","/ɪ/","fill /fɪl/ có /ɪ/ chứ không có /iː/."],
["feel","/iː/","feel /fiːl/ có /iː/; đối lập tối thiểu với fill /fɪl/."],
["live","/ɪ/","live (động từ: sống) /lɪv/ có /ɪ/, khác leave /liːv/."],
["leave","/iː/","leave /liːv/ có /iː/, khác live /lɪv/."]]},
{id:"vowels-front",title:"Phân biệt /e/, /æ/, /ʌ/ và /ɑː/",meaning:"Các cặp bed–bad và cut–cart khác nhau ở độ mở, vị trí lưỡi và độ dài âm. Các phiên âm bên dưới dùng cách đọc Anh-Anh (BrE).",form:"bed /bed/, bad /bæd/, cut /kʌt/, car /kɑː/",core:"Đọc phiên âm nguyên âm thực tế, không chỉ nhìn chữ a, e hoặc u. /ɑː/ trong car là âm dài theo BrE.",mistake:"Không coi /e/ và /æ/ là cùng một nguyên âm; /ʌ/ trong cup cũng không phải /ɑː/.",choices:["/e/","/æ/","/ʌ/","/ɑː/"],rows:[
["bed","/e/","bed /bed/ có /e/, khác bad /bæd/."],["bad","/æ/","bad /bæd/ chứa /æ/, không phải /e/ của bed."],
["cut","/ʌ/","cut /kʌt/ có /ʌ/, không phải /ɑː/."],["car","/ɑː/","car /kɑː/ dùng nguyên âm dài /ɑː/ theo BrE."],
["pen","/e/","pen /pen/ có nguyên âm /e/."],["pan","/æ/","pan /pæn/ có /æ/, khác pen /pen/."],
["cup","/ʌ/","cup /kʌp/ có /ʌ/, không phải /æ/."],["park","/ɑː/","park /pɑːk/ có /ɑː/ trong BrE."],
["head","/e/","head /hed/ đọc /e/ dù viết bằng ea; không phải /iː/."],["hat","/æ/","hat /hæt/ chứa /æ/."]]},
{id:"vowels-back",title:"Nguyên âm /ɒ/, /ɔː/, /ʊ/ và /uː/",meaning:"Trong cách đọc Anh-Anh, lot /lɒt/ đối lập với law /lɔː/; book /bʊk/ đối lập với food /fuːd/. Chữ oo không phải lúc nào cũng đọc /uː/.",form:"lot /lɒt/ · law /lɔː/ · book /bʊk/ · food /fuːd/",core:"Phân biệt độ mở và độ dài, đặc biệt /ʊ/ ngắn trong good, book so với /uː/ dài trong food, moon.",mistake:"Đừng tự động gán oo = /uː/: book và food có hai nguyên âm khác nhau.",choices:["/ɒ/","/ɔː/","/ʊ/","/uː/"],rows:[
["lot","/ɒ/","lot /lɒt/ có /ɒ/ theo BrE."],["law","/ɔː/","law /lɔː/ có nguyên âm dài /ɔː/."],
["book","/ʊ/","book /bʊk/ có /ʊ/, không phải /uː/."],["food","/uː/","food /fuːd/ có /uː/, khác good /ɡʊd/."],
["pot","/ɒ/","pot /pɒt/ mang /ɒ/ trong BrE."],["talk","/ɔː/","talk /tɔːk/ mang /ɔː/ và chữ l không phát âm."],
["good","/ʊ/","good /ɡʊd/ là /ʊ/, không phải /uː/."],["moon","/uː/","moon /muːn/ có /uː/ dài."],
["got","/ɒ/","got /ɡɒt/ có /ɒ/ theo BrE."],["short","/ɔː/","short /ʃɔːt/ có /ɔː/ theo BrE."]]},
{id:"diphthongs",title:"Nguyên âm đôi phổ biến",meaning:"Nguyên âm đôi chuyển vị trí lưỡi trong cùng một âm tiết, ví dụ day /deɪ/, time /taɪ/, boy /bɔɪ/, house /haʊ/, go /ɡəʊ/ trong BrE.",form:"/eɪ/: day · /aɪ/: time · /ɔɪ/: boy · /aʊ/: house · /əʊ/: go (BrE)",core:"Quan sát chuyển động của nguyên âm đôi và không đồng nhất các chữ ow/ou/oi/ay với một âm duy nhất.",mistake:"Không nhầm /aʊ/ (now) với /əʊ/ (know); chữ ow có thể tương ứng cả hai.",choices:["/eɪ/","/aɪ/","/ɔɪ/","/aʊ/","/əʊ/"],rows:[
["day","/eɪ/","day /deɪ/ có nguyên âm đôi /eɪ/."],["time","/aɪ/","time /taɪm/ có /aɪ/."],
["boy","/ɔɪ/","boy /bɔɪ/ có /ɔɪ/."],["house","/aʊ/","house /haʊs/ có /aʊ/."],
["go","/əʊ/","go /ɡəʊ/ có /əʊ/ theo BrE."],["rain","/eɪ/","rain /reɪn/ có /eɪ/."],
["fly","/aɪ/","fly /flaɪ/ có /aɪ/."],["choice","/ɔɪ/","choice /tʃɔɪs/ có /ɔɪ/."],
["now","/aʊ/","now /naʊ/ có /aʊ/, khác know /nəʊ/."],["home","/əʊ/","home /həʊm/ dùng /əʊ/ theo BrE."]]},
{id:"consonants",title:"Các phụ âm dễ nhầm /θ ð ʃ tʃ dʒ/",meaning:"Nhận diện phụ âm đầu qua đối chiếu thin /θ/, this /ð/, ship /ʃ/, chair /tʃ/, judge /dʒ/. /θ/ và /ð/ là âm xát răng, khác /t/ hay /d/.",form:"thin /θɪn/ · this /ðɪs/ · ship /ʃɪp/ · chair /tʃeə/ · judge /dʒʌdʒ/",core:"Phân biệt hữu thanh/vô thanh và âm xát/âm tắc-xát, nhất là th có hai cách đọc /θ/ và /ð/.",mistake:"Không mặc định th = /θ/ trong mọi từ; this bắt đầu bằng /ð/.",choices:["/θ/","/ð/","/ʃ/","/tʃ/","/dʒ/"],rows:[
["thin","/θ/","thin /θɪn/ bắt đầu bằng /θ/ vô thanh."],["this","/ð/","this /ðɪs/ bắt đầu bằng /ð/ hữu thanh."],
["ship","/ʃ/","ship /ʃɪp/ bắt đầu bằng /ʃ/, không phải /tʃ/."],["chair","/tʃ/","chair /tʃeə/ bắt đầu bằng /tʃ/."],
["judge","/dʒ/","judge /dʒʌdʒ/ bắt đầu bằng /dʒ/ hữu thanh."],["think","/θ/","think /θɪŋk/ bắt đầu bằng /θ/."],
["those","/ð/","those /ðəʊz/ bắt đầu bằng /ð/."],["shoe","/ʃ/","shoe /ʃuː/ bắt đầu bằng /ʃ/."],
["cheese","/tʃ/","cheese /tʃiːz/ bắt đầu bằng /tʃ/."],["giant","/dʒ/","giant /ˈdʒaɪənt/ bắt đầu bằng /dʒ/."]]},
{id:"ed-endings",title:"Ba cách phát âm đuôi -ed",meaning:"-ed thường đọc /t/ sau phụ âm vô thanh (trừ /t/), /d/ sau âm hữu thanh (trừ /d/), và /ɪd/ sau /t/ hoặc /d/. Xét âm cuối của động từ gốc chứ không chỉ chữ viết.",form:"worked /wɜːkt/ · played /pleɪd/ · wanted /ˈwɒntɪd/",core:"Nghe âm ngay trước hậu tố: /k, p, f, s, ʃ, tʃ/ → /t/; âm hữu thanh → /d/; /t, d/ → /ɪd/.",mistake:"Không mặc định mọi -ed thành một âm tiết /ɪd/ và không bỏ âm đuôi khi nói.",choices:["/t/","/d/","/ɪd/","silent (không đọc)"],rows:[
["worked","/t/","work kết thúc bằng /k/ vô thanh, nên worked /wɜːkt/ có /t/."],
["watched","/t/","watch kết thúc bằng /tʃ/ vô thanh, nên watched /wɒtʃt/ có /t/."],
["laughed","/t/","laugh kết thúc bằng /f/ vô thanh, nên laughed /lɑːft/ có /t/."],
["stopped","/t/","stop kết thúc bằng /p/, nên stopped /stɒpt/ có /t/."],
["played","/d/","play kết thúc bằng nguyên âm /eɪ/ hữu thanh, nên played /pleɪd/ có /d/."],
["cleaned","/d/","clean kết thúc bằng /n/ hữu thanh, nên cleaned /kliːnd/ có /d/."],
["called","/d/","call kết thúc bằng /l/ hữu thanh, nên called /kɔːld/ có /d/."],
["opened","/d/","open kết thúc bằng /n/, nên opened /ˈəʊpənd/ có /d/."],
["wanted","/ɪd/","want kết thúc bằng /t/, nên wanted /ˈwɒntɪd/ có âm tiết /ɪd/."],
["needed","/ɪd/","need kết thúc bằng /d/, nên needed /ˈniːdɪd/ có /ɪd/."]]},
{id:"s-endings",title:"Ba cách phát âm đuôi -s/-es",meaning:"Đuôi -s/-es đọc /s/ sau phụ âm vô thanh không xì, /z/ sau âm hữu thanh không xì, và /ɪz/ sau /s z ʃ ʒ tʃ dʒ/. Quy tắc dựa trên âm cuối, không dựa vào chính tả.",form:"books /bʊks/ · dogs /dɒɡz/ · buses /ˈbʌsɪz/",core:"Kiểm tra âm cuối của dạng gốc, đặc biệt /s, z, ʃ, ʒ, tʃ, dʒ/ tạo thêm âm tiết /ɪz/.",mistake:"Đừng coi đuôi -es luôn là /ɪz/: makes vẫn đọc /s/ và goes đọc /z/.",choices:["/s/","/z/","/ɪz/","silent (không đọc)"],rows:[
["books","/s/","book kết thúc /k/ vô thanh, nên books /bʊks/ có /s/."],
["cups","/s/","cup kết thúc /p/ vô thanh, nên cups /kʌps/ có /s/."],
["maps","/s/","map kết thúc /p/, nên maps /mæps/ có /s/."],
["stops","/s/","stop kết thúc /p/, nên stops /stɒps/ có /s/."],
["dogs","/z/","dog kết thúc /ɡ/ hữu thanh, nên dogs /dɒɡz/ có /z/."],
["pens","/z/","pen kết thúc /n/ hữu thanh, nên pens /penz/ có /z/."],
["girls","/z/","girl kết thúc /l/ hữu thanh, nên girls /ɡɜːlz/ có /z/."],
["plays","/z/","play kết thúc bằng nguyên âm, nên plays /pleɪz/ có /z/."],
["buses","/ɪz/","bus kết thúc /s/, nên buses /ˈbʌsɪz/ có âm tiết /ɪz/."],
["watches","/ɪz/","watch kết thúc /tʃ/, nên watches /ˈwɒtʃɪz/ có /ɪz/."]]},
{id:"letter-combinations",title:"Tổ hợp chữ cái và âm thực tế",meaning:"Một tổ hợp chữ cái có thể biểu thị các phụ âm khác nhau: ph → /f/ (phone), ch → /k/ (chemistry) hoặc /ʃ/ (chef), gh → /f/ (laugh). Học theo từ và phiên âm.",form:"phone /fəʊn/ · chemistry /ˈkemɪstri/ · chef /ʃef/ · laugh /lɑːf/",core:"So sánh chữ viết với IPA của từng từ; không gán một cách đọc cố định cho ph, ch hay gh trong mọi ngữ cảnh.",mistake:"Không đọc chemistry với /tʃ/ chỉ vì ch thường có âm đó trong chair.",choices:["/f/","/k/","/ʃ/","/tʃ/","/dʒ/","/ɡ/"],rows:[
["phone","ph","/f/","phone /fəʊn/: ph biểu thị /f/."],["graph","ph","/f/","graph /ɡrɑːf/: ph biểu thị /f/."],
["chemistry","ch","/k/","chemistry /ˈkemɪstri/: ch biểu thị /k/."],["chorus","ch","/k/","chorus /ˈkɔːrəs/: ch biểu thị /k/."],
["chef","ch","/ʃ/","chef /ʃef/: ch biểu thị /ʃ/."],["machine","ch","/ʃ/","machine /məˈʃiːn/: ch biểu thị /ʃ/."],
["catch","tch","/tʃ/","catch /kætʃ/: tch biểu thị /tʃ/."],["bridge","dge","/dʒ/","bridge /brɪdʒ/: dge biểu thị /dʒ/."],
["enough","gh","/f/","enough /ɪˈnʌf/: gh biểu thị /f/."],["laugh","gh","/f/","laugh /lɑːf/: gh biểu thị /f/."]]}
];
const lessons=raw.map(l=>({
 id:l.id,title:l.title,meaning:l.meaning,form:l.form,core:l.core,mistake:l.mistake,
 outcome:"Nhận diện và phát âm đúng: "+l.title.toLowerCase()+".",
 faults:["âm ở phương án này không tương ứng với từ đang hỏi","nhầm chính tả với phiên âm IPA","không áp dụng đúng quy tắc môi trường âm"],
 entries:l.rows.map((row,i)=>{
  const isLetters=l.id==="letter-combinations";
  const word=row[0],answer=isLetters?row[2]:row[1],why=isLetters?row[3]:row[2];
  const letter=isLetters?row[1]:"";
  const prompt=isLetters?"In “"+word+"”, the letters “"+letter+"” represent ___ .":
    (l.id==="ed-endings"||l.id==="s-endings"?"In “"+word+"”, the final grammatical ending is pronounced ___ .":
    l.id==="consonants"?"The first consonant sound in “"+word+"” is ___ .":
    "The main vowel sound in “"+word+"” is ___ .");
  const options=[answer,...l.choices.filter(o=>o!==answer).slice(0,3)];
  return [prompt.replace("___",options[1]),prompt,...options,"Trong từ “"+word+"”, đáp án đúng là "+answer+".",why];
 })
}));
g.GrammarTopic1Data=g.GrammarTopicCompiler.build({
 number:1,title:"CHUYÊN ĐỀ 1. PHÁT ÂM – PRONUNCIATION (BrE)",lessons,
 writing:[
 ["Give the BrE IPA vowel in ship and sheep.","ship /ɪ/; sheep /iː/. ",["cặp tối thiểu","/ɪ/ khác /iː/ về chất lượng và độ dài"]],
 ["Classify the -ed endings in worked, played and wanted.","worked /t/; played /d/; wanted /ɪd/. ",["xét âm cuối của gốc","/t, d/ thêm một âm tiết /ɪd/"]],
 ["Classify plural -s in books, dogs and buses.","books /s/; dogs /z/; buses /ɪz/. ",["âm vô thanh /s/","âm hữu thanh /z/; âm xì /ɪz/"]],
 ["Compare the first consonant of thin and this.","thin /θ/; this /ð/. ",["/θ/ vô thanh","/ð/ hữu thanh"]]
 ]});
})(window);