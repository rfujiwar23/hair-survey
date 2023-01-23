<!-- be able to iterate through recommendedItem and display on the front-end -->


<!-- scalpType, damageType, hairType, and finishType are all inside the recommendedItem.json -->

if (ans1 = scalpType) && if (ans2 = damageType) &&
if (ans3 = hairType) && if (ans4 = finishType) {
    return (
        <div className="itemList">
            <div className="itemListRow">
                <div class="item">
                    <h2>{recItem1}</h2>
                    <!-- recItem1img -->
                    <img>
                    <p>{recItem1description}</p>
                </div>
                <div class="item">
                    <h2>{recItem2}</h2>
                    <!-- recItem2img -->
                    <img>
                    <p>{recItem2description}</p>
                </div>
                <div class="item">
                    <h2>{recItem3}</h2>
                    <!-- recItem3img -->
                    <img>
                    <p>{recItem3description}</p>
                </div>
            </div>
        </div>
    )
}
