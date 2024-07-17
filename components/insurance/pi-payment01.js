import React, { useEffect, useRef, useState } from 'react'
import styles from './insurance.module.css'
import Link from 'next/link'
import ProgressBarCopy from './progress-bar-copy'
import withProgressBar from './withProgressBar'
import Head from 'next/head'
import { useRouter } from 'next/router'

function PiPayment01() {
  const agreements = [
    {
      id: 'agreementItem01',
      agreementSubject: '個資法告知事項',
      agreementContent:
        '親愛的客戶，您好： 寵度保險股份有限公司（以下稱本公司）依據個人資料保護法（以下稱個資法）第八條及第九條規定，向 台端告知下列事項，請 台端詳閱： 一、蒐集之目的：辦理財產保險(093)、人身保險(001)、行銷(040)及其他合於營業登記項目或組織章程所定之業務(181)。 二、蒐集之個人資料類別：包括但不限於姓名、身分證統一編號、聯絡方式、本網站瀏覽或查詢時伺服器自行產生的相關紀錄（包括但不限於您使用設備的IP位址、使用的瀏覽器、使用時間、瀏覽及點選資料紀錄等）等，詳如要保書或相關業務申請書內容。 三、個人資料之來源（個人資料非由當事人提供間接蒐集之情形適用）： (一)要保人/被保險人/受益人 (二)司法警憲機關、委託協助處理理賠之公證人或機構 (三)當事人之法定代理人、輔助人 (四)各醫療院所 (五)與第三人共同行銷、交互運用客戶資料、合作推廣等關係、或於本公司各項業務內所委託往來之第三人。 (六)經當事人同意授權之同一金融控股公司所屬銀行子公司之網路銀行帳戶 四、個人資料利用之期間、對象、地區及方式： (一)期間：因執行業務所必須及依法令規定應為保存之期間。 (二)對象：本(分)公司及本公司海外分支機構、中華民國產物保險商業同業公會、中華民國人壽保險商業同業公會、財團法人保險事業發展中心、財團法人保險安定基金、財團法人住宅地震保險基金、財團法人汽車交通事故特別補償基金、財團法人保險犯罪防制中心、財團法人金融消費評議中心、財團法人金融聯合徵信中心、財團法人聯合信用卡中心、台灣票據交換所、財金資訊公司、關貿網路股份有限公司、中央健康保險局、業務委外機構、與本公司有再保業務往來之公司、依法有調查權機關或金融監理機關。 (三)地區：上述對象所在之地區。 (四)方式：合於法令規定之利用方式。 五、依據個資法第三條規定，台端就本公司保有 台端之個人資料得行使之權利及方式： (一)得向本公司行使之權利： 1.向本公司查詢、請求閱覽或請求製給複製本。 2.向本公司請求補充或更正。 3.向本公司請求停止蒐集、處理或利用及請求刪除。 (二)行使權利之方式：書面或其他日後可供證明之方式。 六、台端不提供個人資料所致權益之影響： 台端若未能提供相關個人資料時，本公司將可能延後或無法進行必要之審核及 處理作業，因此可能婉謝承保、遲延或無法提供 台端完善的保險服務。 【註】1.上開告知事項已公告於本公司官網，如有任何問題歡迎洽詢本公司0800-212-880，免付費客服專線。 2.本告知事項內容若有更動，係以官網公告為準。',
    },
    {
      id: 'agreementItem02',
      agreementSubject: '寵度產險網站服務使用約定書',
      agreementContent: `認知與接受：

第一條
國泰世紀產物保險股份有限公司（以下稱本公司）係依據本約定書條款提供國泰產險官方網站（https://www.cathay-ins.com.tw，以下簡稱本公司網站）會員服務（以下簡稱本服務）。當會員使用本服務時，除代表已完全瞭解及接受本約定書之所有約定外，並同意本公司對會員的個人資料，有依「個人資料保護法」之相關規定，為蒐集、處理或國際傳輸、利用等之權利。

第二條
本公司有權於任何時間修改或變更本約定書之內容，建議會員隨時注意該等修改或變更。會員於本約定書有任何修改或變更後繼續使用本公司網站，視為會員已閱讀、瞭解並同意接受該等修改或變更。如果會員不同意本約定書的內容，或者會員所屬的國家或地域排除本約定書內容之全部或一部時，會員應立即停止使用本公司網站。若會員尚未滿十八歲，應經法定代理人（或監護人）閱讀、瞭解並同意本約定書之內容及其後之修改變更後，方得使用本公司網站。

服務範圍

第三條
本服務均為免費提供，本公司得隨時增加、取消或修改本服務內容之全部或一部。

登錄義務

第四條
為得以使用本服務，會員同意：
1.依服務登錄表提供正確、最新及完整的資料。
2.提供的資料如有錯誤或不實，本公司得暫停或終止會員身分。

顧客資料保密措施

第五條
會員所登錄之資料，受「個人資料保護法」及本公司「顧客資料保密措施」之保護。

會員帳號、密碼與安全

第六條
會員應妥善保管帳號及密碼，並於每次使用後確實登出，以防他人盜用。 會員發現或懷疑自己的會員身分證字號或密碼遭他人盜用時，應該立即通知本公司採取必要的處置。但該通知不得解釋為本公司對會員負有任何賠償或補償之責任或義務。

使用者的守法義務及承諾

第七條
會員承諾絕不為任何非法目的或以任何非法方式使用本公司網站，並承諾遵守中華民國相關法規及一切使用網際網路之國際慣例。會員若係中華民國以外之使用者，並同意遵守所屬國家或地域之法令。會員同意並保證不得利用本服務從事侵害他人權益或違法之行為，包括但不限於：
1.公布或傳送任何誹謗、侮辱、具威脅性、攻擊性、不雅、猥褻、不實、違反公共秩序或善良風俗或其他不法之文字、圖片或任何形式的檔案於本公司網站上。
2.違反依法律或契約所應負之保密義務。
3.冒用他人名義使用本服務。
4.傳輸或散佈電腦病毒。
5.其他本公司網站有正當理由認為不適當之行為。

資訊或建議

第八條
會員由本公司網站或本公司網站連結之其他網站下載取得之軟體或資料，本公司對該軟體或資料不負擔保或保證之責。

廣告行為

第九條
本公司網站上所有廣告，均由各該廣告商、產品與服務的供應商所設計與提出，會員對於廣告內容之正確性與可信度應自行判斷，本公司僅提供網站供刊登或鏈結，對該廣告不負擔保責任。

買賣或其他交易行為

第十條
會員經由本公司網站連結之其他網站與廠商進行商品買賣、服務或其他交易者，其因此所生之法律關係僅存在於會員與廠商之間，與本公司無涉。

智慧財產權

第十一條
本公司所使用之軟體、程式及網站上所有內容，包括但不限於著作、圖片、檔案、資訊、資料、網站架構、網站畫面的安排、網頁設計，均由本公司或其他權利人依法擁有其智慧財產權，包括但不限於商標權、專利權、著作權、營業秘密與專有技術等。
任何人不得逕自使用、修改、重製、公開播送、改作、散佈、發行、公開發表或進行還原工程、解編或反向組譯。若會員欲引用或轉載前述軟體、程式或網站內容，必須依法取得本公司或其他權利人的事前書面同意。如有違反，會員應對本公司負損害賠償責任（包括但不限於訴訟費用及律師費用等）。

個人資料保護

第十二條
本公司為提供會員更好的客戶服務而蒐集、處理或利用會員於本公司網站中留存之個人資料，本公司皆會以尊重會員的權益為基礎，於會員同意期間內，以誠實信用之方法處理或利用會員所提供的資料 。本公司只會蒐集與上述目的相關且有需要的個人資料，會員的個人資料原則上僅會在法令許可的範圍之下，以電子檔或紙本形式，於我國境內提供本公司及本公司委外廠商之處理及利用。本公司訂有國泰產險個人資料管理政策，並有完善之國泰產險個人資料檔案安全維護計畫，任何流程皆有嚴格之控管程序及標準作業流程，會員所提供的一切資料均會予以嚴加保密。基於個人資料保護法之規定，會員可以撥打本公司免費客戶服務專線（0800-212-880），針對會員的個人資料請求本公司答覆查詢、提供閱覽、製給複製本、更正、補充、停止蒐集、處理、利用或刪除。會員亦可至本公司官方網站之個人資料保護專區進一步瞭解相關權益。

免責聲明

第十三條
本公司網站除本公司所提供之服務、資訊且無第十四條第四款之情事者外，就下列事項不負保證之責：
1.本服務符合會員的需求。
2.本服務之及時提供、安全性、可靠性、正確性、完整性或不受干擾。

服務暫停或中止

第十四條
有下列情事之一者，本公司得暫停、變更、中斷或終止本服務之全部或一部，對於會員因此所致之損害，本公司不負任何賠償或補償責任：
1.本公司對本服務相關軟硬體設備進行搬遷、更換、升級、保養或維修者。
2.會員有任何違反政府法令或本約定書條款者。
3.天災或其他不可抗力。
4.非本公司所得控制之事由致本服務資訊顯示不正確、遭偽造、竄改、刪除或擷取或致系統中斷或不能正常運作時。
5.其他不可歸責於本公司之事由。

會員身份終止

第十五條
會員違反本約定書條款，或將其基於本約定書所生之會員權利讓與他人行使者，本公司得不經催告終止其會員資格，並追究相關之法律責任。會員得隨時以書面或電子郵件通知本公司終止其會員資格。

第十六條
本約定書任一條款無效者，不影響其他條款之效力。會員與本公司之權利義務，依網路規範及中華民國法律定之；因本約定書所生事項涉訟時，以臺灣臺北地方法院為第一審管轄法院。

我已詳閱並同意以上聲明事項。`,
    },
    {
      id: 'agreementItem03',
      agreementSubject: '網路投保聲明事項',
      agreementContent: `申請人茲向寵度保險股份有限公司（以下簡稱「本公司」）申請透過本公司指定網站（下稱「本網站」，https://www.cathay-ins.com.tw/）進行網路投保。申請人於申請網路投保前，已詳閱且同意遵守本網站國泰產險網站服務使用約定書、網路保險服務契約書、產險業履行個人資料保護法告知義務內容及下列事項：

一、有關本公司所發給之密碼或加密工具，為本公司對申請人身分之認證，申請人應妥善保管；經核對密碼或加密工具無誤時，即視為申請人親自申請。

二、在使用網路投保服務時，可能面對以下風險：如斷線、斷電、網路壅塞或其他因素等造成傳輸之阻礙，致電子訊息無法傳送、接收或時間延遲。另外其他可能導致本網站無法正常使用之原因，如網路提供業者之線路穩定性、使用者操作不當、斷電及天災等不可抗力因素，係非本公司可控制範圍。因影響網路投保之因素無法一一詳述，申請人於進行網路投保前，應對本公司不定時發布之最新訊息及其他注意事項等詳加注意及遵守。

三、有下列情形之一者，本公司得不處理申請人之網路投保申請：

本公司認該網路投保申請之真實性或所指定事項之正確性有疑義者。
該網路投保申請之內容，違反相關法令之規定或保險契約之約定者。
申請人已詳細閱讀並充分瞭解以上網路投保之注意事項、可能產生之風險及相關使用約定，爰同意以網路進行投保事宜，特此聲明。`,
    },
    {
      id: 'agreementItem04',
      agreementSubject: '網路保險服務聲明事項',
      agreementContent: `本契約書於中華民國    年    月    日交付消費者審閱。（契約審閱期間至少五日）

第一條   契約之適用範圍

當事人間依電子簽章法及相關法令之規定從事保險電子交易者，適用本契約之約定。但個別網路保險服務契約對消費者之保護更有利者，從其約定。

第二條   名詞定義

本契約之名詞定義如下：
一、「保險電子交易」：指消費者經由網際網路與本保險公司資訊系統電腦連線，且利用電子簽章或其他足資辨識消費者身分之方式，直接取得本保險公司所提供之各項保險服務。
二、「電子訊息」：指本保險公司或消費者經由網際網路連線傳遞之訊息。
三、「數位簽章」：指將電子文件以數學演算法或其他方式運算為一定長度之數位資料，以簽署人之私密金鑰對其加密，形成電子簽章，並得以公開金鑰加以驗證者。
四、「私密金鑰」：指一組具有配對關係之數位資料中，由簽章製作者保有之數位資料，該數位資料係作電子訊息解密及製作數位簽章之用。
五、「公開金鑰」：指一組具有配對關係之數位資料中，用以對電子訊息加密、或驗證簽署者身分及數位簽章真偽之數位資料。
六、「加密」：指利用數學演算法或其他方法，將電子文件以亂碼方式處理。
七、「電子簽章」：指依附於電子文件並與其相關連，用以辨識及確認電子文件簽署人身分、資格及電子文件真偽者。
八、「憑證」：指載有簽章驗證資料，用以確認簽署人身分、資格之電子形式證明。
九、「資訊系統」：指產生、送出、收受、儲存或其他處理電子形式訊息資料之系統。

第三條   連線所使用之網路

本保險公司及消費者應各自與網路業者簽訂網路服務契約，並各自負擔網路使用之費用。

第四條   網頁之確認

消費者與本保險公司交易前，應先確認本保險公司正確之網址。
本保險公司應盡善良管理人之注意義務，隨時維護網站的正確性與安全性，以避免消費者之權益受損。

第五條   電子訊息之接收與回應

本保險公司接收含數位簽章或經本保險公司及消費者同意用以辨識身分之電子訊息後，應立即以下列方式之ㄧ要求消費者再確認：
一、以資訊系統自動回覆通知消費者。
二、以資訊系統再次確認裝置提示消費者。
經消費者依前項規定再確認者，該項電子訊息視為已經本保險公司受理。
本保險公司受理消費者之電子訊息後，應即時進行檢核或處理，並於三日內將結果通知消費者。
本保險公司應於同意承保後，將網路保險交易成功訊息（內容包含保險單號碼或交易序號、保險單生效時間、保險金額等重要資訊）傳送予消費者。
本保險公司同意承保後，保險契約即為成立。 本保險公司或消費者接收來自對方任何電子訊息，若無法辨識其身分或內容時，視為傳送作業未完成。
但本保險公司可確定消費者身分時，應立即將內容無法辨識之事實通知消費者。

第六條   電子訊息之不處理

有下列情形之一者，本保險公司得不處理任何接收之電子訊息：
一、 本保險公司能舉出證據有具體理由懷疑電子訊息之真實性或所指定事項之正確性者。
二、 本保險公司依據電子訊息處理，將違反相關法令或保險契約之規定者。
本保險公司不處理前項電子訊息者，應同時將不處理之具體理由及情形通知消費者。

第七條   消費者軟硬體安裝與風險

消費者申請使用本契約之服務項目，應自費安裝其所需之電腦軟體、硬體，以及其他與安全相關之設備。 消費者於使用本保險公司所交付之軟硬體設備時，如因可歸責於本保險公司之事由致受有損害，得向本保險公司請求賠償。

第八條   消費者之注意義務

消費者對使用者帳號、密碼、憑證及相關文件，應妥善保管。 消費者輸入前項密碼連續錯誤達三次時，本保險公司資訊系統即自動停止消費者使用本契約之服務。消費者如擬恢復使用，應向本保險公司提出申請。

第九條   交易核對

本保險公司於每筆交易指示處理完畢後，以電子訊息或雙方約定之方式通知消費者，消費者應核對其結果有無錯誤。如有不符，應於通知到達之日起四十五日內，通知本保險公司查明。 本保險公司對於消費者之通知，應即進行調查，並於通知到達本保險公司之日起四十五日內，將調查之情形或結果覆知消費者。

第十條   電子訊息錯誤之處理

消費者利用本契約之服務，如其電子訊息因不可歸責於消費者之事由而發生錯誤者，本保險公司應協助消費者更正，並提供其他必要之協助。 前項服務因可歸責於本保險公司之事由而發生錯誤者，本保險公司應於知悉時，立即更正，並同時以電子訊息或雙方約定之方式通知消費者。

第十一條 電子文件之合法授權與責任

雙方應確保所傳送至對方之電子訊息均經合法授權。 雙方於發現有第三人冒用或盜用使用者帳號、密碼、憑證或其他任何未經合法授權之情形，應立即以電話或書面或其他約定方式通知他方停止使用該服務並採取防範之措施。 本保險公司接受通知前，已依前項服務之指示為給付者，不受拘束，但本保險公司有故意或過失者不在此限。

第十二條   資料安全

本保險公司對所承保之消費者及其利害關係人之個人資料檔案，應採取適當之安全措施，防止個人資料被竊取、竄改、毀損、滅失或洩露。 本保險公司違反前項規定，致個人資料遭不法蒐集、處理、利用或其他侵害當事人權利者，應負損害賠償責任。但能證明其無故意或過失者，不在此限。

第十三條 資訊保密義務

本保險公司因處理本契約及基於本契約所從事之保險電子交易，所取得之相關資料負有保密義務。除經當事人同意或符合個人資料保護之相關法令規定外，本保險公司不得使用於與本契約無關之目的或對第三人揭露。

第十四條   損害賠償責任

因本契約雙方之故意或過失，就本契約傳送或接收電子訊息，有遲延、遺漏或錯誤之情事；或就本契約所生義務之不履行或遲延履行，而致他方受有損害時，應負賠償責任。

第十五條   紀錄保存

雙方應保存所有保險電子交易訊息（不含查詢類）紀錄，並應確保其真實性及完整性。 本保險公司對前項紀錄之保存，應盡善良管理人之注意義務。 保存期限至少為保險契約有效期限屆滿或通知消費者不同意承保後五年。

第十六條   電子訊息之效力

雙方同意依本契約利用電子簽章或電子文件方式交換之電子訊息，其效力與書面簽署或書面文件相同。

第十七條   消費者終止契約

消費者得隨時通知本保險公司終止本契約。

第十八條   保險公司終止契約

本保險公司欲終止本契約時，須於終止日三十日前以書面通知消費者。但消費者如有下列情事之一者，本保險公司得隨時以書面通知消費者終止本契約： 一、消費者未經本保險公司同意，擅自將本契約之權利或義務轉讓第三人。 二、消費者受法院破產或重整宣告。 三、消費者違反本契約第十一條第一項之規定。 四、消費者違反本契約之其他約定，經催告改善或限期請求履行未果。

第十九條   通知處所

消費者或本保險公司就本契約事項對他方為通知者，應向他方所留存本契約之最後地址或電子郵件信箱為之。

第二十條   法令適用

本契約準據法，依中華民國法律。

第二十一條   管轄法院

因本契約涉訟者，雙方同意以消費者住所地地方法院為第一審管轄法院。消費者之住所在中華民國境外時，以臺灣台北地方法院為第一審管轄法院。但不得排除消費者保護法第四十七條及民事訴訟法第四百三十六條之九小額訴訟管轄法院之適用。

第二十二條   契約修訂

本契約如有未盡事宜，得經本保險公司及消費者協議補充或修正之。`,
    },
  ]
  const [agreementsStatus, setAgreementsStatus] = useState({
    agreementItem01: false,
    agreementItem02: false,
    agreementItem03: false,
    agreementItem04: false,
  })

  const [data, setData] = useState(null)

  // 傳入保險開始日期
  const [dates, setDates] = useState({ startDate: null, endDate: null })

  //處理時區問題
  const formatDate = (date) => {
    if (!date) return '' //如果日期無效,返回空字串
    return date
      .toLocaleDateString('zh-TW', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        timeZone: 'Asia/Taipei', // 使用台北時區
      })
      .replace(/\//g, '-') // 將斜線替換為連字符，以保持 YYYY-MM-DD 格式
  }

  // 取得選擇的保險方案
  const [planType, setPlanType] = useState('')
  // 為了聲明勾選的狀況
  const [agreementClicked, setAgreementClicked] = useState(new Set())
  // 為了顯示選擇的聲明內容
  const [selectedAgreement, setSelectedAgreement] = useState(agreements[0])
  // 為了已詳閱並同意以上聲明事項
  const [checkedRead, setCheckedRead] = useState(false)

  // 預覽和上傳寵物大頭照
  // 記錄選擇的圖檔(File物件)
  const [selectedImg, setSelectedImg] = useState('/pi-pic/pet-upload.png')
  // 預覽圖片的網址
  const [previewURL, setPreviewURL] = useState('/pi-pic/pet-upload.png')
  // 伺服器回傳訊息
  const [message, setMessage] = useState('')
  // 檔案輸入參考
  const fileInputRef = React.createRef()
  // localStorage大小限制(5MB)
  const LOCALSTORAGE_LIMIT = 5 * 1024 * 1024
  // 為了主動告知事項
  const [disclosure1, setDisclosure1] = useState('否')
  const [disclosure2, setDisclosure2] = useState('否')
  const [disclosure3, setDisclosure3] = useState('否')
  const [disclosure4, setDisclosure4] = useState('否')
  const [disclosure5, setDisclosure5] = useState('否')

  const router = useRouter()

  const handleImgClick = () => {
    fileInputRef.current.click()
  }

  const handleImageChange = (e) => {
    if (e.target && e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]

      if (!file) {
        setMessage('沒有選擇檔案')
        return
      }

      if (file.size > LOCALSTORAGE_LIMIT) {
        setMessage('圖片大小超過 5MB 限制，請選擇較小的圖片')
        return
      }

      setSelectedImg(file)
      const newPreviewUrl = URL.createObjectURL(file)
      setPreviewURL(newPreviewUrl)
    }
  }

  const handleImageUpload = () => {
    if (selectedImg instanceof File) {
      // 將圖片轉換為 base64
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result
        if (base64String.length > LOCALSTORAGE_LIMIT) {
          setMessage('圖片大小超過 5MB 限制')
          return
        }
        try {
          // 保存到 localStorage
          localStorage.setItem('petPhoto', base64String)
          // setMessage('圖片已成功保存')
        } catch (e) {
          setMessage('保存圖片失敗, 可能是超出 5MB 限制')
        }
      }
      reader.readAsDataURL(selectedImg)
    } else {
      setMessage('請先選擇一張新圖片')
    }
  }

  // 處理點擊聲明書
  const handleClick = (id) => {
    setAgreementsStatus((prevStatus) => ({
      ...prevStatus,
      [id]: true,
    }))

    setSelectedAgreement(agreements.find((agreement) => agreement.id === id))
  }

  const formRef = useRef(null)

  const handleSubmit = (event) => {
    event.preventDefault()

    // 檢查是否有任何告知事項選擇了"是"
    if (
      disclosure1 === '是' ||
      disclosure2 === '是' ||
      disclosure3 === '是' ||
      disclosure4 === '是' ||
      disclosure5 === '是'
    ) {
      alert('由於您在告知事項中選擇了"是"，無法進行投保。')
      return
    }

    // 檢查是否所有同意項目都已勾選
    if (!Object.values(agreementsStatus).every(Boolean)) {
      alert('請同意所有聲明事項')
      return
    }

    // 檢查"已詳閱並同意以上聲明事項"已勾選
    if (!checkedRead) {
      alert('請勾選已詳閱並同意以上聲明事項')
      return
    }

    try {
      // 收集所有表單數據
      const formData = new FormData(formRef.current)

      const holderID = formData.get('policyholder_IDcard')
      const petName = formData.get('pet_name')
      const petChip = formData.get('pet_chip')

      // 檢查必要欄位是否填寫
      const missingFields = []
      if (!holderID) missingFields.push('身份證字號')
      if (!petName) missingFields.push('寵物姓名')
      if (!petChip) missingFields.push('晶片序號')

      if (missingFields.length > 0) {
        throw new Error(`請填寫以下必要欄位：${missingFields.join(', ')}`)
      }

      // 保存所有數據到 localStorage
      localStorage.setItem(
        'petBasicData',
        JSON.stringify({
          HolderID: holderID,
          PetName: petName,
          PetChip: petChip,
        }),
      )

      // 成功提示
      alert('資料已成功保存，請繼續下一步驟')
      // 跳轉下一頁
      router.push('/insurance/insurance-payment02')
    } catch (error) {
      console.error('保存失敗:', error)
      alert(error.message || '保存失敗，請檢查所有欄位並重試。')
    }
  }
  // 暫存寵物圖片
  useEffect(() => {
    const savedImg = localStorage.getItem('petPhoto')
    if (savedImg) {
      setPreviewURL(savedImg)
      setSelectedImg(savedImg)
    }
  }, [])

  useEffect(() => {
    // 這個代碼塊只會在客戶端執行
    // 取得並解析 localStorage 中的資料
    const catData = localStorage.getItem('catInsuranceData')
    const dogData = localStorage.getItem('dogInsuranceData')
    const parseData = JSON.parse(catData || dogData) // 整合貓跟狗的資料
    setData(parseData)
  }, [])

  useEffect(() => {
    if (data && data.insuranceStartDate) {
      // 取得保險起始日期並計算結束日期
      const startDate = new Date(data.insuranceStartDate)
      const endDate = new Date(startDate) //保險結束日期
      endDate.setFullYear(endDate.getFullYear() + 1)

      setDates({ startDate, endDate })
    }
  }, [data])

  useEffect(() => {
    const selectedPlan = JSON.parse(localStorage.getItem('selectedPlan'))
    if (selectedPlan) {
      setPlanType(selectedPlan.type)
    }
  }, [])

  if (!data || !dates.startDate) {
    return <div>Loading...</div>
  }

  return (
    <>
      <Head>
        <title>寵物資料 | Petitude</title>
      </Head>
      <div className="container-fluid mb-5">
        <div className="row justify-content-center">
          {/* 進度條 */}
          <ProgressBarCopy />

          {/* 投保寵物資料 */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="col-8 d-flex flex-column justify-content-center align-items-center"
          >
            <div className="col-12" style={{ marginTop: '30px' }}>
              <h4 className={styles['top-frame']}>投保寵物資料</h4>

              <div
                className={`d-flex justify-content-center ${styles['data-frame']}`}
              >
                <div className="col-6 justify-content-center align-items-center px-5">
                  <label htmlFor="policyholder_IDcard">
                    <h5
                      className={styles['text-color']}
                      style={{ marginBottom: '11px' }}
                    >
                      要保人身份證字號(寵物登記紀錄之飼主)
                    </h5>
                  </label>
                  <input
                    className={styles['sheet-input']}
                    type="text"
                    placeholder="請輸入身分證字號"
                    id="policyholder_IDcard"
                    name="policyholder_IDcard"
                  />
                  <label htmlFor="pet_name">
                    <h5
                      className={`${styles['text-color']} mt-4`}
                      style={{ marginBottom: '11px' }}
                    >
                      寵物姓名
                    </h5>
                  </label>
                  <input
                    className={styles['sheet-input']}
                    type="text"
                    placeholder="請輸入寵物姓名"
                    id="pet_name"
                    name="pet_name"
                  />
                  <label htmlFor="pet_chip">
                    <h5
                      className={`${styles['text-color']} mt-4`}
                      style={{ marginBottom: '11px' }}
                    >
                      寵物晶片序號
                    </h5>
                  </label>
                  <input
                    className={styles['sheet-input']}
                    type="text"
                    placeholder="請輸入寵物晶片號碼10-15碼"
                    id="pet_chip"
                    name="pet_chip"
                  />
                  <h5
                    className={`${styles['text-color']} mt-4`}
                    style={{ marginBottom: '11px' }}
                  >
                    保險期間
                  </h5>
                  <h5 className={styles['own-green']}>
                    {formatDate(dates.startDate)} 零時起至{' '}
                    {formatDate(dates.endDate)} 零時止
                  </h5>
                  <h5
                    className={`${styles['text-color']} mt-4`}
                    style={{ marginBottom: '11px' }}
                  >
                    保險方案
                  </h5>
                  <h5 className={styles['own-green']}>{planType}</h5>
                  {/* </form> */}
                </div>
                <div
                  className="col-6 d-flex flex-column justify-content-start align-items-center"
                  style={{ padding: '0 20px 20px 20px' }}
                >
                  <img
                    src={previewURL}
                    className="img-fluid rounded-circle mb-4"
                    style={{
                      backgroundColor: '#D9D9D9',
                      width: '60%',
                      cursor: 'pointer',
                    }}
                    // 圖案點了可以選擇上傳圖片
                    onClick={handleImgClick}
                    alt="Pet"
                  />
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                    accept="image/*"
                  />
                  <button
                    className={`${styles['own-btn2']} border-0`}
                    style={{ width: '50%' }}
                    onClick={handleImageUpload}
                  >
                    上傳寵物大頭照
                  </button>
                  {message && <p style={{ color: 'red' }}> {message}</p>}
                </div>
              </div>
            </div>

            {/* 投保寵物主動告知事項 */}
            <div className="col-12" style={{ marginTop: '30px' }}>
              <h4 className={styles['top-frame']}>投保寵物主動告知事項</h4>
              <div
                className={`d-flex justify-content-center ${styles['data-frame']}`}
              >
                <div className="col-12 justify-content-center align-items-center px-5">
                  {/* <form> */}
                  <div>
                    <h5
                      className={styles['text-color']}
                      style={{ marginBottom: '1.25rem' }}
                    >
                      敬請對下列告知事項應據實告知並親自填寫，如有為隱匿或遺漏不為說明，或為不實的說明，足以影響本公司對危險的評估，依保險法第六十四條規定保險公司得解除契約
                    </h5>
                  </div>
                  <div
                    className="me-5 form-check"
                    style={{ padding: 0, margin: 0 }}
                  >
                    <div className="d-flex" style={{ marginBottom: '1.25rem' }}>
                      <div className="col-8">
                        <h5>是否有投保其他寵物保險?</h5>
                      </div>
                      <div className="col-4 d-flex justify-content-start align-items-center">
                        <div className="form-check d-flex align-items-center">
                          <input
                            className="form-check-input me-2"
                            style={{ margin: 0 }}
                            type="radio"
                            name={disclosure1}
                            id="disclosure1No"
                            checked={disclosure1 === '否'}
                            onChange={() => setDisclosure1('否')}
                            required
                          />
                          <label
                            className="form-check-label d-flex align-items-center me-2"
                            htmlFor="disclosure1No"
                          >
                            <h5 style={{ margin: 0 }}>否</h5>
                          </label>
                        </div>
                        <div className="form-check d-flex align-items-center">
                          <input
                            className="form-check-input me-2"
                            style={{ margin: 0 }}
                            type="radio"
                            name="disclosure1"
                            id="disclosure1Yes"
                            checked={disclosure1 === '是'}
                            onChange={() => setDisclosure1('是')}
                          />
                          <label
                            className="form-check-label d-flex align-items-center"
                            htmlFor="disclosure1Yes"
                          >
                            <h5 style={{ margin: 0 }}>是</h5>{' '}
                            {disclosure1 === '是' && (
                              <span style={{ color: 'red', marginLeft: '5px' }}>
                                如選是則無法投保
                              </span>
                            )}
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex" style={{ marginBottom: '1.25rem' }}>
                      <div className="col-8">
                        <h5>
                          過去一年內被保險寵物是否服用或施打疫苗(含狂犬病疫苗)?
                        </h5>
                      </div>
                      <div className="col-4 d-flex justify-content-start align-items-center">
                        <div className="form-check d-flex align-items-center">
                          <input
                            className="form-check-input me-2"
                            style={{ margin: 0 }}
                            type="radio"
                            name="disclosure2"
                            id="disclosure2No"
                            checked={disclosure2 === '否'}
                            onChange={() => setDisclosure2('否')}
                            required
                          />
                          <label
                            className="form-check-label d-flex align-items-center me-2"
                            htmlFor="disclosure2No"
                          >
                            <h5 style={{ margin: 0 }}>否</h5>
                          </label>
                        </div>
                        <div className="form-check d-flex align-items-center">
                          <input
                            className="form-check-input me-2"
                            style={{ margin: 0 }}
                            type="radio"
                            name="disclosure2"
                            id="disclosure2Yes"
                            checked={disclosure2 === '是'}
                            onChange={() => setDisclosure2('是')}
                          />
                          <label
                            className="form-check-label d-flex align-items-center"
                            htmlFor="disclosure2Yes"
                          >
                            <h5 style={{ margin: 0 }}>是</h5>
                            {disclosure2 === '是' && (
                              <span style={{ color: 'red', marginLeft: '5px' }}>
                                如選是則無法投保
                              </span>
                            )}
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex" style={{ marginBottom: '1.25rem' }}>
                      <div className="col-8">
                        <h5>
                          被保險寵物最近二個月內是否曾因疾病或傷害接受醫師治療、診療或用藥?
                        </h5>
                      </div>
                      <div className="col-4 d-flex justify-content-start align-items-center">
                        <div className="form-check d-flex align-items-center">
                          <input
                            className="form-check-input me-2"
                            style={{ margin: 0 }}
                            type="radio"
                            name="disclosure3"
                            id="disclosure3No"
                            checked={disclosure1 === '否'}
                            onChange={() => setDisclosure3('否')}
                            required
                          />
                          <label
                            className="form-check-label d-flex align-items-center me-2"
                            htmlFor="disclosure3No"
                          >
                            <h5 style={{ margin: 0 }}>否</h5>
                          </label>
                        </div>
                        <div className="form-check d-flex align-items-center">
                          <input
                            className="form-check-input me-2"
                            style={{ margin: 0 }}
                            type="radio"
                            name="disclosure3"
                            id="disclosure3Yes"
                            checked={disclosure3 === '是'}
                            onChange={() => setDisclosure3('是')}
                          />
                          <label
                            className="form-check-label d-flex align-items-center"
                            htmlFor="disclosure3Yes"
                          >
                            <h5 style={{ margin: 0 }}>是</h5>
                            {disclosure3 === '是' && (
                              <span style={{ color: 'red', marginLeft: '5px' }}>
                                如選是則無法投保
                              </span>
                            )}
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex" style={{ marginBottom: '1.25rem' }}>
                      <div className="col-8">
                        <h5>目前被保險寵物身體是否有被診斷出以下疾病或障礙?</h5>
                        <h5>◎失明 ◎四肢缺陷 ◎出血、腹瀉 ◎耳聾</h5>
                      </div>
                      <div className="col-4 d-flex justify-content-start align-items-center">
                        <div className="form-check d-flex align-items-center">
                          <input
                            className="form-check-input me-2"
                            style={{ margin: 0 }}
                            type="radio"
                            name="disclosure4"
                            id="disclosure4No"
                            checked={disclosure4 === '否'}
                            onChange={() => setDisclosure4('否')}
                            required
                          />
                          <label
                            className="form-check-label d-flex align-items-center me-2"
                            htmlFor="disclosure4No"
                          >
                            <h5 style={{ margin: 0 }}>否</h5>
                          </label>
                        </div>
                        <div className="form-check d-flex align-items-center">
                          <input
                            className="form-check-input me-2"
                            style={{ margin: 0 }}
                            type="radio"
                            name="disclosure4"
                            id="disclosure4Yes"
                            checked={disclosure4 === '是'}
                            onChange={() => setDisclosure4('是')}
                          />
                          <label
                            className="form-check-label d-flex align-items-center"
                            htmlFor
                          >
                            <h5 style={{ margin: 0 }}>是</h5>
                            {disclosure4 === '是' && (
                              <span style={{ color: 'red', marginLeft: '5px' }}>
                                如選是則無法投保
                              </span>
                            )}
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex">
                      <div className="col-8">
                        <h5>被保險寵物如有體檢，檢體內容是否有異常項目?</h5>
                        <h5 style={{ color: 'red' }}>
                          異常項目包含:
                          癌症、膝蓋骨異位、髖關節發育不良、椎間盤突出、心臟疾病、腎臟疾病、癲癇、糖尿病、甲狀腺疾病或其他疾病
                        </h5>
                      </div>
                      <div className="col-4 d-flex justify-content-start align-items-center">
                        <div className="form-check d-flex align-items-center">
                          <input
                            className="form-check-input me-2"
                            style={{ margin: 0 }}
                            type="radio"
                            name="disclosure5"
                            id="disclosure5No"
                            checked={disclosure5 === '否'}
                            onChange={() => setDisclosure5('否')}
                            required
                          />
                          <label
                            className="form-check-label d-flex align-items-center me-2"
                            htmlFor="disclosure5No"
                          >
                            <h5 style={{ margin: 0 }}>否</h5>
                          </label>
                        </div>
                        <div className="form-check d-flex align-items-center">
                          <input
                            className="form-check-input me-2"
                            style={{ margin: 0 }}
                            type="radio"
                            name="disclosure5"
                            id="disclosure5Yes"
                            checked={disclosure5 === '是'}
                            onChange={() => setDisclosure5('是')}
                          />
                          <label
                            className="form-check-label d-flex align-items-center"
                            htmlFor
                          >
                            <h5 style={{ margin: 0 }}>是</h5>
                            {disclosure5 === '是' && (
                              <span style={{ color: 'red', marginLeft: '5px' }}>
                                如選是則無法投保
                              </span>
                            )}
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* </form> */}
                </div>
              </div>
            </div>
            {/* 同意聲明告知 */}
            <div className="col-12" style={{ marginTop: '30px' }}>
              <h4 className={styles['top-frame']}>同意聲明告知</h4>
              <div className={styles['data-frame']}>
                <div className="col-12 justify-content-center">
                  {/* <form> */}
                  <div className="d-flex justify-content-around">
                    {agreements.map((agreement, index) => (
                      <div
                        key={index}
                        className={`form-check ${styles['cfm-frame']} ${agreementClicked.has(agreement.id) ? styles.read : ''}`}
                      >
                        <input
                          className="form-check-input"
                          style={{
                            border: '3px solid #B7B7B7',
                            margin: '0 5px 0 0',
                          }}
                          type="checkbox"
                          onChange={() => handleClick(agreement.id)}
                          checked={agreementsStatus[agreement.id]}
                          id={agreement.id}
                          required
                        />
                        <label
                          className="form-check-label"
                          htmlFor={agreement.id}
                        >
                          {agreement.agreementSubject}
                        </label>
                      </div>
                    ))}
                  </div>

                  <textarea
                    rows={10}
                    className={`mt-3 ${styles.InfoDetail} border-0 no-outline`}
                    value={selectedAgreement.agreementContent}
                    readOnly
                  />
                  {/* </form> */}
                </div>
              </div>
            </div>
            {/* 確認同意 */}
            <div className="col-12">
              <div
                className="form-check align-items-center my-3"
                style={{ padding: 0 }}
              >
                <input
                  className="form-check-input"
                  style={{
                    border: '3px solid #B7B7B7',
                    marginLeft: 0,
                    padding: 0,
                  }}
                  id="flexCheckDefault4"
                  type="checkbox"
                  checked={checkedRead}
                  onChange={(e) => setCheckedRead(e.target.checked)}
                />
                <label
                  className="form-check-label ms-2"
                  htmlFor="flexCheckDefault4"
                >
                  <h5 style={{ marginBottom: 0 }}>
                    我已詳閱並同意以上聲明事項{' '}
                  </h5>
                </label>
              </div>
              <div
                className="form-check mb-3 d-flex align-items-start"
                style={{ margin: 0, padding: 0 }}
              >
                <input
                  className="form-check-input"
                  style={{
                    border: '3px solid #B7B7B7',
                    marginLeft: 0,
                    paddingTop: 10,
                  }}
                  type="checkbox"
                  defaultValue
                  id="flexCheckDefault5"
                />
                <label
                  className="form-check-label ms-2"
                  htmlFor="flexCheckDefault5"
                >
                  <h5 style={{ marginBottom: 0 }}>
                    本人同意所蒐集之聯絡資料(姓名、地址、email)作為寵度保險依金控法第43條第2項，進行共同行銷之特定目的使用。如未勾選不影響本次投保權益，可直接進行下一步
                  </h5>
                </label>
              </div>
            </div>

            {/* 下一步 */}
            <div className="col-12">
              <div>
                <div className="d-flex justify-content-center align-items-center">
                  <Link href="/insurance" className="text-decoration-none">
                    <button className={styles['own-btn4']}>返回</button>
                  </Link>
                  <button
                    className={styles['own-btn4']}
                    type="submit"
                    onClick={handleSubmit}
                  >
                    下一步
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default withProgressBar(PiPayment01)
