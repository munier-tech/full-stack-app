import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Link } from "react-router-dom"

export const MenubarDemo = () => {
  return (
    <div className="bg-transparent">
      <DropdownMenu >
      <DropdownMenuTrigger>
        <div className="w-[30px]">
        <img className="w-full mt-2" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAdVBMVEX///8jHyAAAACXl5chHyDT09MMDAwMAAQQDA0GAAHt7e0hHR4kHyH7+/scFxjm5uZfXV7d3d1GRka2tra8u7wyMjJxcHEUEBHIxsevr6+rqaplY2RXVlagoKDz8fI5NzgWFBV5eHjY1tc+Pj6Tk5McFRfMzMxvRVBOAAACtklEQVR4nO3dbW+bMBSGYeeEFBPAKaWBJiVvTZP//xMHySpN26Qdsw/opPf1vZIfQTGObB7nAAAAAAAAAAAAAAAAAPzbqp7bUa+i8712It4/meC9F+leo/ItnyUktgR5XuoDVuu2mM36P5uZcB9o8bSutAH3h+PUgx4lHPbKhE1m5OL9Lm10ARdi5fb8gyxUCU+t2YTtSROwTPKpBzpanpeKhCuZepz/QTQz/9V0wjcSuuFROvUwxyvkQ5GwNJxwJqo5vwtTj3O0S6cJ6DZiczrsX09lo0pYnm1exH59cdZMh71rZnLOT/Lsqgvo3FbyYurxxktkqw3oXJ1diuG+tvQP2UqtD9ivgd/FH+0kzIOXd/X69yvjvMt9asSsm8fmAwAAAAAAAAAAAAAAAOKU1cKKSnuU5BfL3YtY8rKLOPU02IbM1hbMkF0i9u25shF7+y9zaZS7S3uNya3eSaY89uTczuY26KKQnS7gqrV3i97lXve4madTj3Q0/6lKaHQj+yCcNQGXJh8zP4nmNrV97kmzW//NcMLiG5xd01zDx/8/dGer06H2Weo+/dQDHS3VzYdLb/MiJon2naZ/LzV46mlIqH0vHT6qMPVox0hEvbb4BuvDYY0voV+O2BHSqDW++wa/0wz2j/1bGwAAAAAAAAAAAAAAABChmneJTzML0jSJ/xb08D3vkOc2drf14wxp5Pe868xSp1Vx2ywa9U32rcnqgFz/XX2r3QhJpjmL4G79Fkb3CGv7LTZ2jyMoO0oM98wEVc/M43cFfZhOqCnPs3yyi1ayu8fvziuNvI3+ja7/0J3aqQc6mq7D0nJ5nrKH1DVWj+d57cGn/eForM3qJjmq+4BdtfYGE3p9p/Otl/toLGFcL7f76lY3I7pbvVeu6qlL7yPUmpkeAAAAAAAAAAAAAAAAwA/iK2pmVG9VSgAAAABJRU5ErkJggg==" alt="" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
        <Link to="/new">
              <h1 className="">Article</h1>
              </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem>Subscription</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

    </div>
  )
}

