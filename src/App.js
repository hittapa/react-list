import './App.css';
import { Button, Card, CardActions, CardContent, Checkbox, InputBase } from '@mui/material';
import countries from './countries.json';
import { Box } from '@mui/system';
import { styled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { useState } from 'react';


const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));


function App() {
  const [selected, setSelected] = useState([]);
  const [showSelectedOnly, setShowSelectedOnly] = useState(false);
  const [search, setSearch] = useState("");

  const handleSwitch = (e) => {
    setShowSelectedOnly(e.target.checked);
  }

  const handleCheck = (value) => (e) => {
    let _selected = [...selected];
    if (e.target.checked) {
      _selected.push(value);
    } else {
      _selected.slice(_selected.indexOf(value))
    }
    setSelected(_selected);
  }

  const handleClear = () => {
    let _selected = [...selected];
    _selected = []
    setSelected(_selected);
    setShowSelectedOnly(false);
  }

  const handleSearch = (e) => {
    setSearch(e.target.value);
  }

  let filtered = showSelectedOnly ? selected : countries;
  filtered = filtered.filter(value => value.label.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="App">
      <header className="App-header">
        <Card sx={{ maxWidth: 650, minWidth: 450, borderRadius: 4, py: 1, px: 2, border: '1px solid #d8d8d8' }}>
          <InputBase
            sx={{ flex: 1, width: '100%', borderBottom: "1px solid #d8d8d8" }}
            placeholder="Search"
            inputProps={{ 'aria-label': 'search' }}
            onChange={handleSearch}
          />
          <CardContent sx={{ flex: 1, maxHeight: 400, alignItems: 'flex-start', padding: 0 }}>
            <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', my: 1 }}>
              <FormControlLabel
                control={<IOSSwitch onChange={handleSwitch} sx={{ m: 1 }} checked={showSelectedOnly} />}
                label="Show selected only"
              />
              <Button
                sx={{
                  bgcolor: "#fff",
                  color: "#383838",
                  width: 100,
                  borderRadius: 20,
                  textTransform: "capitalize",
                  fontWeight: "400",
                  fontSize: 15
                }}
                onClick={handleClear}
              >Clear all</Button>
            </Box>
            <Box sx={{ maxHeight: 300, minHeight: 250, display: "flex", flexDirection: "column", overflowY: 'auto', borderBottom: "1px solid #d8d8d8", padding: 2 }}>
              {
                filtered.map(country => {
                  return (
                    <FormControlLabel
                      key={country.value}
                      control={
                        <Checkbox checked={selected.includes(country)} name={country.label} onChange={handleCheck(country)} />
                      }
                      label={country.label}
                    />
                  )
                })
              }
            </Box>
          </CardContent>
          <CardActions sx={{ justifyContent: "flex-end", mt: 2 }}>
            <Button
              sx={{
                bgcolor: "#6e9",
                color: "white",
                width: 100,
                borderRadius: 20,
                textTransform: "capitalize",
                fontWeight: "600",
                fontSize: 18,
                "&:hover": {
                  bgcolor: "#6e3"
                }
              }}
            >Save</Button>
          </CardActions>
        </Card>
      </header>
    </div >
  );
}

export default App;
