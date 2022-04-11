import React, {useEffect , useState} from 'react'
import { Container, Grow, Grid } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import  { getPosts } from '../../actions/posts';
import Posts from '../Posts/posts'
import Form from '../Form/form'
import UseStyle from './style'

const Home = () => {
    const [currentId, setcurrentId] = useState(0)
    const dispatch = useDispatch();
    const classes = UseStyle()

    
    useEffect(() => {
      dispatch(getPosts());
     }, [currentId, dispatch]);
    
  return (
    <Grow in>
        <Container>
          <Grid container className={classes.mainContainer} justifyContent ="space-between" alignItems='center' spacing={3}>
            <Grid item xs={12} sm={7}>
              <Posts setcurrentId={setcurrentId}/>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setcurrentId={setcurrentId}/>
            </Grid>
          </Grid>

        </Container>
      </Grow>

  )
}

export default Home