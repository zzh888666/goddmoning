<template>
    <div class="datacard">
        <div class="imgBx">
            <img src="@/assets/image/img.png">
        </div>
        <div class="datacardcontent">
            <div class="details">
                <h2>Alina Smith<br><span>Senior UX/UI Designer</span></h2>
                <div class="datacardinfo">
                    <h3>342<br><span>Posts</span></h3>
                    <h3>120k<br><span>Followers</span></h3>
                    <h3>285<br><span>Following</span></h3>
                </div>
                <div class="actionBtn">
                    <button>Follow</button>
                    <button>Message</button>
                </div>
            </div>
        </div>
    </div>
</template>


<style>

.datacard {
  position: relative;
  width: 350px;
  height: 190px;
  /* height: 450px; */
  /* background: #fff; */
  /* background-image: linear-gradient(to right top, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8aa7ec, #79b3f4, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1); */
  background-image: url(@/assets/image/bc03.png);
  /*03*/
  border-radius: 20px;
  box-shadow: 0 35px 80px rgba(0, 0, 0, 0.15);
  transition: 0.5s;

}

.datacard:hover {
  height: 450px;
}

.imgBx {
  position: absolute;
  left: 50%;
  top: -50px;
  transform: translateX(-50%);
  width: 150px;
  height: 150px;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.35);
  overflow: hidden;
  transition: 0.5s;
}

.datacard:hover .imgBx {
  width: 250px;
  height: 250px;
}

.imgBx img{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.datacard .datacardcontent {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  overflow: hidden;
}

.datacard .datacardcontent .details {
  padding: 40px;
  text-align: center;
  width: 100%;
  transition: 0.5s;
  transform: translateY(150px);
}

.datacard:hover .datacardcontent .details {
  transform: translateY(0px);
}

.datacard .datacardcontent .details h2 {
  font-size: 1.25em;
  font-weight: 600;
  color: #555;
  line-height: 1.2em;
}

.datacard .datacardcontent .details h2 span {
  font-size: 0.75em;
  font-weight: 500;
  opacity: 0.5;
}

.datacard .datacardcontent .details .datacardinfo {
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
}

.datacard .datacardcontent .details .datacardinfo h3 {
  font-size: 1em;
  color: #555;
  line-height: 1.2em;
  font-weight: 600;
}

.datacard .datacardcontent .details .datacardinfo h3 span {
  font-size: 0.85em;
  font-weight: 400;
  opacity: 0.5;
}

.datacard .datacardcontent .details .actionBtn {
  display: flex;
  justify-content: space-between;
}

.datacard .datacardcontent .details .actionBtn button {
  padding: 10px 30px;
  border-radius: 5px;
  border: none;
  outline: none;
  font-size: 1em;
  font-weight: 500;
  background: #ff5f95;
  color: #fff;
  cursor: pointer;
}

.datacard .datacardcontent .details .actionBtn button:nth-child(2) {
  border: 1px solid #999;
  color: #999;
  background: #fff;
}</style>