import { Typography, Box, makeStyles, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper, IconButton, Tooltip } from "@material-ui/core"
import { orange } from '@material-ui/core/colors';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
const useStyles = makeStyles({
 stuListColor: {
  backgroundColor: orange[400],
  color: "white"
 },
 tableHeadCell: {
  color: "white",
  fontWeight: "bold",
  fontSize: 16
 },
})

const List = () => {
 const classes = useStyles();
 const [user, setUser] = useState([]);

 useEffect(() => {
  async function getAllStudent() {
   try {
    const user = await axios.get("http://localhost:3333/users")
    // console.log(students.data);
    setUser(user.data);
   } catch (error) {
    console.log("Something is Wrong");
   }
  }
  getAllStudent();
 }, [])

 const handleDelete = async id => {
  await axios.delete(`http://localhost:3333/users/${id}`);
  var newuser = user.filter((item) => {
   // console.log(item);
   return item.id !== id;
  })
  setUser(newuser);
 }


 return (
  <>
   <Box textAlign="center" p={2} className={classes.stuListColor}>
    <Typography variant="h4">User List</Typography>
   </Box>
   <TableContainer component={Paper}>
    <Table>
     <TableHead>
      <TableRow style={{ backgroundColor: "#616161" }}>
       <TableCell align="center" className={classes.tableHeadCell}>No</TableCell>
       <TableCell align="center" className={classes.tableHeadCell}>Name</TableCell>
       <TableCell align="center" className={classes.tableHeadCell}>Email</TableCell>
       <TableCell align="center" className={classes.tableHeadCell}>Action</TableCell>
      </TableRow>
     </TableHead>
     <TableBody>
      {
        user.map((user, i) => {
        return (
         <TableRow key={i}>
          <TableCell align="center">{i + 1}</TableCell>
          <TableCell align="center">{user.username}</TableCell>
          <TableCell align="center">{user.email}</TableCell>
          <TableCell align="center">
           <Tooltip title="View">
            <IconButton><Link to={`/view/${user.id}`}><VisibilityIcon color="primary" /></Link></IconButton>
           </Tooltip>
           <Tooltip title="Edit">
            <IconButton><Link to={`/edit/${user.id}`}><EditIcon /></Link></IconButton>
           </Tooltip>
           <Tooltip title="Delete">
            <IconButton onClick={() => handleDelete(user.id)}><DeleteIcon color="secondary" /></IconButton>
           </Tooltip>
          </TableCell>
         </TableRow>
        )
       })
      }

     </TableBody>
    </Table>
   </TableContainer>
  </>
 )
}

export default List






