import Component, { PageEl } from '@/components/Libs/Component';
import Copy from '@/components/Libs/Copy';
import Router from 'next/router'
import Window from '@/components/Libs/Window';
import TextBox from '@/components/Libs/TextBox';
import Icon2Titles from '@/components/Libs/Icon2Titles';
import Icon3Titles from '@/components/Libs/Icon3Titles';


export default p => Component(p, Page);
const Page: PageEl = (props, state, refresh, getProps) => {

  let styles = global.styles


  return (
    <div style={{ direction: "rtl", minHeight: "11vh", }}>
      <br-x />
      <Window title={" قیمت لحظه ای تتر (دلار)"} style={{ minHeight: 200, margin: 10, width: "calc(100% - 20px)" }}>
        
        <div style={{width:"100%" , height:50 , backgroundColor:"#A8D6B8" , borderRadius:10, textAlign:"center"
        }}>
          <br/>
          price: {props.p.price as number}
        </div>

        <div style={{width:"100%" , height:50 , backgroundColor:"#A8D6B8" , borderRadius:10, textAlign:"center"
        }}>
          <br/>
          تغییرات ۲۴ ساعت: % {(Number(props.p.diff24d) as number).toLocaleString("fa-IR")}
        </div>
        
        <div style={{width:"100%" , height:50 , backgroundColor:"#A8D6B8" , borderRadius:10, textAlign:"center"
        }}>
          <br/>
          تغییرات هفتگی: % {(Number(props.p.diff7d) as number).toLocaleString("fa-IR")}
        </div>

        <div style={{width:"100%" , height:50 , backgroundColor:"#A8D6B8" , borderRadius:10, textAlign:"center"
        }}>
          <br/>
          تغییرات ماهانه: {(Number(props.p.diff30d) as number).toLocaleString("fa-IR")}
        </div>

        <center>
          تهیه شده توسط تیم پژوهشی
        </center>
        
      </Window>
    </div>
  )
}


export async function getServerSideProps(context) {


  var session = await global.SSRVerify(context)
  var { uid, name, image, imageprop, lang, cchar,
    unit, workspace, servid, servsecret,
    usedquota, quota, quotaunit, status, regdate, expid,
    role, path, devmod, userip, } = session;

    let res = await fetch("https://api.tetherland.com/currencies")
    let dataa = await res.json();
    let p = dataa.data.currencies.USDT

    console.log('priceeeeeeeeeee:',p)

  return {
    props: {
      data: global.QSON.stringify({
        p,
        session,
        // nlangs,
      })
    },
  }
}