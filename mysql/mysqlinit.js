const {sequelize} = require('@/mysql/utils');
const bcrypt = require('bcrypt');
const md5 = require('js-md5');
// 引入数据库文件
const {User} = require('@/mysql/miniprogram/user');
const {Admin} = require('@/mysql/admin/admin');
const {LoopImgs} = require('@/mysql/miniprogram/loopImgs');

const {EmoBaseImgType} = require('@/mysql/miniprogram/emoBaseImgType');
const {EmoBaseImg} = require('@/mysql/miniprogram/emoBaseImg');

const {MakeBaseEmo} = require('@/mysql/miniprogram/makeBaseEmo');

const {ChristmasHatType} = require('@/mysql/miniprogram/christmasHatType');
const {ChristmasHat} = require('@/mysql/miniprogram/christmasHat');

const {MakePageThemm} = require('@/mysql/miniprogram/makePageThemm');

const {DayRecommend} = require('@/mysql/miniprogram/dayRecommend');

//表情分享
const {UserShareEmos} = require('@/mysql/miniprogram/userShareEmos');
const {UserShareEmoComments} = require('@/mysql/miniprogram/userShareEmoComments');
const {UserShareEmoLikes} = require('@/mysql/miniprogram/userShareEmoLikes');
//举报
const {ShareEmoReports} = require('@/mysql/admin/shareEmoReports');
//推送
const {RecommendSendUsers} = require('@/mysql/admin/recommendSendUsers');
//用户未读消息
const {UserUnreadMessages} = require('@/mysql/miniprogram/userUnreadMessages');
//制作GIF图
const {Basegifs} = require('@/mysql/admin/basegifs');
//推送评论
const {RecommendComments} = require('@/mysql/miniprogram/recommendComments');
//评论回复
const {ShareEmoCommentReply} = require('@/mysql/miniprogram/shareEmoCommentReply');
//抖图
const {GifRooms} = require('@/mysql/miniprogram/gifRooms');
const {UserGifRoomMarks} = require('@/mysql/miniprogram/userGifRoomMarks');
const {GifRoomLikes} = require('@/mysql/miniprogram/gifRoomLikes');
const {GifRoomShares} = require('@/mysql/miniprogram/gifRoomShares');
//签到
const {SignRecord} = require('@/mysql/miniprogram/signRecord');
const {ScroeRecord} = require('@/mysql/miniprogram/scroeRecord');
const {UserTaskRecord} = require('@/mysql/miniprogram/userTaskRecord');
//邀请用户
const {UserInviteRecords} = require('@/mysql/miniprogram/userInviteRecords') ;
//表情仓库
const {EmoHouseSorts} = require('@/mysql/emohouse/emoHouseSorts');
const {PublicEmoHouse} = require('@/mysql/emohouse/publicEmoHouse');
const {UserEmoHouse} = require('@/mysql/emohouse/userEmoHouse');
//套路
const {TaoLu} = require('@/mysql/taolu/taolu') ;// 引入数据库文件
const {TaoLuImage} = require('@/mysql/taolu/taoluImage') ;// 引入数据库文件
//关注
const {UserFollewers} = require('@/mysql/emohouse/userFollewers') ;// 引入数据库文件
//搜索记录
const {SearchRecords} = require('@/mysql/miniprogram/searchRecords') ;// 引入数据库文件

const mysqlinit = {
      init:()=>{
        console.log("初始化数据库");
        sequelize.query('SELECT table_name FROM information_schema.TABLES WHERE table_name =\'em_users\';', { type: sequelize.QueryTypes.SELECT }).then(function (results) {
          // console.log(results.length);
          if (results.length === 0){
            User.sync({force: true});
          }
        });
        sequelize.query('SELECT table_name FROM information_schema.TABLES WHERE table_name =\'em_admins\';', { type: sequelize.QueryTypes.SELECT }).then(async function (results) {
          // console.log(results.length);
          if (results.length === 0){
            Admin.sync({force: true});
            var hash = md5.create();
            hash.update("123456");
            let password = hash.hex();
            const hash_pass = await bcrypt.hash(password, 5);
            const endData = await Admin.insertData("admin", hash_pass);
            if (endData){
              console.log("管理员创建成功");
            }
          }
        });
        sequelize.query('SELECT table_name FROM information_schema.TABLES WHERE table_name =\'em_loopimgs\';', { type: sequelize.QueryTypes.SELECT }).then(async function (results) {
          // console.log(results.length);
          if (results.length === 0){
            LoopImgs.sync({force: true});
            const endData = await LoopImgs.insertData('/images/loopimgs/1.jpeg', '最刺激','最好玩',0,'https://www.baidu.com');

            if (endData){
              const endData2 = await LoopImgs.insertData('/images/loopimgs/2.jpeg', 'enenen','哈哈哈哈哈哈',0,'https://www.baidu.com');
              if (endData2) {
                console.log("插入轮播图成功");
              }
            }
          }
        });
        sequelize.query('SELECT table_name FROM information_schema.TABLES WHERE table_name =\'em_emobaseimgtypes\';', { type: sequelize.QueryTypes.SELECT }).then(async function (results) {
          console.log(results.length);
          if (results.length === 0){
            EmoBaseImgType.sync({force: true});
            let endData = await EmoBaseImgType.insertData('蘑菇头','/images/baseImg/tool1.gif');
            let endData2 = await EmoBaseImgType.insertData('魔鬼','/images/baseImg/tool2.gif');
            if (endData){
              console.log("插入表情图片类型成功");
            }
          }
        });
        sequelize.query('SELECT table_name FROM information_schema.TABLES WHERE table_name =\'em_emobaseimgs\';', { type: sequelize.QueryTypes.SELECT }).then(async function (results) {
          // console.log(results.length);
          if (results.length === 0){
            EmoBaseImg.sync({force: true});
            const endData = await EmoBaseImg.insertData('/images/emoBaseImg/1.png', 1,0,"1");
            const endData1 = await EmoBaseImg.insertData('/images/emoBaseImg/2.png', 2,0,"2");
            const endData2 = await EmoBaseImg.insertData('/images/emoBaseImg/3.png', 3,0,"1");
            const endData3 = await EmoBaseImg.insertData('/images/emoBaseImg/2.png', 4,1,"2");
            const endData4 = await EmoBaseImg.insertData('/images/emoBaseImg/3.png', 5,1,"1");
            if (endData2){
              console.log("插入表情图片成功");
            }
          }
        });
        sequelize.query('SELECT table_name FROM information_schema.TABLES WHERE table_name =\'em_makebaseemos\';', { type: sequelize.QueryTypes.SELECT }).then(async function (results) {
          console.log(results.length);
          if (results.length === 0){
            MakeBaseEmo.sync({force: true});
          }
        });
        sequelize.query('SELECT table_name FROM information_schema.TABLES WHERE table_name =\'em_christmashattypes\';', { type: sequelize.QueryTypes.SELECT }).then(async function (results) {
          console.log(results.length);
          if (results.length === 0){
            ChristmasHatType.sync({force: true});
            let endData = await ChristmasHatType.insertData('红色','');
            let endData2 = await ChristmasHatType.insertData('绿色','');
            if (endData){
              console.log("插入圣诞帽类型成功");
            }
          }
        });
        sequelize.query('SELECT table_name FROM information_schema.TABLES WHERE table_name =\'em_christmashats\';', { type: sequelize.QueryTypes.SELECT }).then(async function (results) {
          console.log(results.length);
          if (results.length === 0){
            ChristmasHat.sync({force: true});
            let endData = await ChristmasHat.insertData('/images/christmasHat/sdm1.png','经典帽',"1");
            let endData2 = await ChristmasHat.insertData('/images/christmasHat/sdm2.png','经典帽',"2");
            if (endData){
              console.log("插入圣诞帽成功");
            }
          }
        });
        sequelize.query('SELECT table_name FROM information_schema.TABLES WHERE table_name =\'em_makepagethemms\';', { type: sequelize.QueryTypes.SELECT }).then(async function (results) {
          console.log(results.length);
          if (results.length === 0){
            MakePageThemm.sync({force: true});
            let themm = {
              theemColor: '#222',//主题颜色
              borderColor:'#ffffff',
              theemSelColor:'#E7C281',
              emoImgSelBorderColor:'#E7C281',
              sliderBg:'#f2f3f4',
              btnTextColor:'#fff',
              navigationBarColor:'#8FD5D5',
              navigationBarTextColor:'#000000',
              backgroundColorTop:'#8FD5D5',
              backgroundColorBottom:'#8FD5D5',
              emoText: "戴帽子过圣诞",
              bgPath:"/images/makeBg/bg.jpg",
              status:1,
            };
            let endData = await MakePageThemm.insertData(themm);
            if (endData){
              console.log("插入主题成功");
            }
          }
        });
        sequelize.query('SELECT table_name FROM information_schema.TABLES WHERE table_name =\'em_dayrecommends\';', { type: sequelize.QueryTypes.SELECT }).then(async function (results) {
          if (results.length === 0){
            DayRecommend.sync({force: true});
          }
        });
        sequelize.query('SELECT table_name FROM information_schema.TABLES WHERE table_name =\'em_usershareemos\';', { type: sequelize.QueryTypes.SELECT }).then(async function (results) {
          if (results.length === 0){
            UserShareEmos.sync({force: true});
          }
        });
        sequelize.query('SELECT table_name FROM information_schema.TABLES WHERE table_name =\'em_usershareemocomments\';', { type: sequelize.QueryTypes.SELECT }).then(async function (results) {
          if (results.length === 0){
            UserShareEmoComments.sync({force: true});
          }
        });
        sequelize.query('SELECT table_name FROM information_schema.TABLES WHERE table_name =\'em_shareemoreports\';', { type: sequelize.QueryTypes.SELECT }).then(async function (results) {
          if (results.length === 0){
            ShareEmoReports.sync({force: true});
          }
        });
        sequelize.query('SELECT table_name FROM information_schema.TABLES WHERE table_name =\'em_usershareemolikes\';', { type: sequelize.QueryTypes.SELECT }).then(async function (results) {
          if (results.length === 0){
            UserShareEmoLikes.sync({force: true});
          }
        });
        sequelize.query('SELECT table_name FROM information_schema.TABLES WHERE table_name =\'em_recommendsendusers\';', { type: sequelize.QueryTypes.SELECT }).then(async function (results) {
          if (results.length === 0){
            RecommendSendUsers.sync({force: true});
          }
        });
        sequelize.query('SELECT table_name FROM information_schema.TABLES WHERE table_name =\'em_userunreadmessages\';', { type: sequelize.QueryTypes.SELECT }).then(async function (results) {
          if (results.length === 0){
            UserUnreadMessages.sync({force: true});
          }
        });
        sequelize.query('SELECT table_name FROM information_schema.TABLES WHERE table_name =\'em_basegifs\';', { type: sequelize.QueryTypes.SELECT }).then(async function (results) {
          if (results.length === 0){
            Basegifs.sync({force: true});
          }
        });
        sequelize.query('SELECT table_name FROM information_schema.TABLES WHERE table_name =\'em_recommendcomments\';', { type: sequelize.QueryTypes.SELECT }).then(async function (results) {
          if (results.length === 0){
            RecommendComments.sync({force: true});
          }
        });
        sequelize.query('SELECT table_name FROM information_schema.TABLES WHERE table_name =\'em_shareemocommentreplys\';', { type: sequelize.QueryTypes.SELECT }).then(async function (results) {
          if (results.length === 0){
            ShareEmoCommentReply.sync({force: true});
          }
        });
        sequelize.query('SELECT table_name FROM information_schema.TABLES WHERE table_name =\'em_gifrooms\';', { type: sequelize.QueryTypes.SELECT }).then(async function (results) {
          if (results.length === 0){
            GifRooms.sync({force: true});
          }
        });
        sequelize.query('SELECT table_name FROM information_schema.TABLES WHERE table_name =\'em_gifroommarks\';', { type: sequelize.QueryTypes.SELECT }).then(async function (results) {
          if (results.length === 0){
            UserGifRoomMarks.sync({force: true});
          }
        });
        sequelize.query('SELECT table_name FROM information_schema.TABLES WHERE table_name =\'em_gifroomlikes\';', { type: sequelize.QueryTypes.SELECT }).then(async function (results) {
          if (results.length === 0){
            GifRoomLikes.sync({force: true});
          }
        });
        sequelize.query('SELECT table_name FROM information_schema.TABLES WHERE table_name =\'em_gifroomshares\';', { type: sequelize.QueryTypes.SELECT }).then(async function (results) {
          if (results.length === 0){
            GifRoomShares.sync({force: true});
          }
        });
        sequelize.query('SELECT table_name FROM information_schema.TABLES WHERE table_name =\'em_signRecords\';', { type: sequelize.QueryTypes.SELECT }).then(async function (results) {
          if (results.length === 0){
            SignRecord.sync({force: true});
          }
        });
        sequelize.query('SELECT table_name FROM information_schema.TABLES WHERE table_name =\'em_scroeRecords\';', { type: sequelize.QueryTypes.SELECT }).then(async function (results) {
          if (results.length === 0){
            ScroeRecord.sync({force: true});
          }
        });
        sequelize.query('SELECT table_name FROM information_schema.TABLES WHERE table_name =\'em_userTaskRecords\';', { type: sequelize.QueryTypes.SELECT }).then(async function (results) {
          if (results.length === 0){
            UserTaskRecord.sync({force: true});
          }
        });
        sequelize.query('SELECT table_name FROM information_schema.TABLES WHERE table_name =\'em_userinviterecords\';', { type: sequelize.QueryTypes.SELECT }).then(async function (results) {
          if (results.length === 0){
            UserInviteRecords.sync({force: true});
          }
        });
        sequelize.query('SELECT table_name FROM information_schema.TABLES WHERE table_name =\'em_userEmoHouses\';', { type: sequelize.QueryTypes.SELECT }).then(async function (results) {
          if (results.length === 0){
            UserEmoHouse.sync({force: true});
          }
        });
        sequelize.query('SELECT table_name FROM information_schema.TABLES WHERE table_name =\'em_publicEmoHouses\';', { type: sequelize.QueryTypes.SELECT }).then(async function (results) {
          if (results.length === 0){
            PublicEmoHouse.sync({force: true});
          }
        });
        sequelize.query('SELECT table_name FROM information_schema.TABLES WHERE table_name =\'em_emoHouseSorts\';', { type: sequelize.QueryTypes.SELECT }).then(async function (results) {
          if (results.length === 0){
            EmoHouseSorts.sync({force: true});
          }
        });
        console.log("mysqlinit");
        sequelize.query('SELECT table_name FROM information_schema.TABLES WHERE table_name =\'em_taoLus\';', { type: sequelize.QueryTypes.SELECT }).then(async function (results) {
          if (results.length === 0){
            TaoLu.sync({force: true});
          }
        });
        sequelize.query('SELECT table_name FROM information_schema.TABLES WHERE table_name =\'em_taoLuImages\';', { type: sequelize.QueryTypes.SELECT }).then(async function (results) {
          if (results.length === 0){
            TaoLuImage.sync({force: true});
          }
        });
        sequelize.query('SELECT table_name FROM information_schema.TABLES WHERE table_name =\'em_userFollewers\';', { type: sequelize.QueryTypes.SELECT }).then(async function (results) {
          if (results.length === 0){
            UserFollewers.sync({force: true});
          }
        });
        sequelize.query('SELECT table_name FROM information_schema.TABLES WHERE table_name =\'em_searchRecords\';', { type: sequelize.QueryTypes.SELECT }).then(async function (results) {
          if (results.length === 0){
            SearchRecords.sync({force: true});
          }
        });
      }
};

module.exports.mysqlinit = mysqlinit;



