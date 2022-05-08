import * as React from 'react';
import Card from '@mui/material/Card';
import { Radio, RadioGroup, Grid } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { LeftArrow, RightArrow } from "./Arrow";
import "./hideScrollbar.css";


export default function ItemCard(props) {

    const { data, selectedItem, onEdit, onEditItem } = props
    const [value, setValue] = React.useState(itemList && itemList[0] ? itemList[0].itemCode : "");
    const [itemList, setItemList] = React.useState([])

    const handleRadioChange = (item) => {
        console.log("sasas", item);
        setValue(item.itemCode);
        selectedItem(item)
        //setOpen(false);
    };

    React.useEffect(() => {
        setItemList(data)
        if (onEdit && data.find(item => item.itemName === onEditItem)) {
            let obj = data.find(item => item.itemName === onEditItem)
            setValue(obj.itemCode)
        }
    }, [data])
    

    const onWheel = (apiObj, ev) => {
        const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;
      
        if (isThouchpad) {
          ev.stopPropagation();
          return;
        }
      
        if (ev.deltaY < 0) {
          apiObj.scrollNext();
        } else if (ev.deltaY > 0) {
          apiObj.scrollPrev();
        }
      }


    return (
        <div>
            {console.log("sasa", data)}<ScrollMenu
            LeftArrow={LeftArrow}
            RightArrow={RightArrow}
            onWheel={onWheel}
          >
            {itemList ? itemList.map((item, index) => {
    return (
        <RadioGroup
            row
            aria-label="position"
            name="quiz"
            value={value}
            onChange={() => handleRadioChange(item)}
        >
            <Card sx={{ maxWidth: 345, margin: 1 , minWidth:250 }}>
                <CardMedia
                    component="img"
                    alt="green iguana"
                    height="140"
                    image={item.itemImg}
                />
                <CardContent>
                    {/* <Typography gutterBottom variant="h5" component="div">
                        {item.itemName}
                    </Typography> */}
                    <Typography variant="body2" color="text.secondary">
                    {item.itemName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {"RS"} {item.itemPrice}{".00"}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Radio value={item.itemCode} />
                </CardActions>
            </Card>
        </RadioGroup>
    )
}) : null}
          </ScrollMenu>
        </div>

    );
}


