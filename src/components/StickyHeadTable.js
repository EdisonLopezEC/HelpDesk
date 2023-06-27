<<<<<<< HEAD
import React from 'react'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import "animate.css";
import styles from './styles/Table.module.css'
import TransitionsModal from './TransitionsModal';
// import OpenInFullIcon from '@mui/icons-material/OpenInFull';


const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
  {
    id: 'population',
    label: 'Population',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'size',
    label: 'Size\u00a0(km\u00b2)',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'density',
    label: 'Density',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
];

function createDataA(fecha, remitente, asunto, mensaje, button = null){
  return {fecha, remitente, asunto, mensaje, button};
}

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}



const rows = [
  createData('India', 'IN', 1324171354, 3287263),
  createData('China', 'CN', 1403500365, 9596961),
  createData('Italy', 'IT', 60483973, 301340),
  createData('United States', 'US', 327167434, 9833520),
  createData('Canada', 'CA', 37602103, 9984670),
  createData('Australia', 'AU', 25475400, 7692024),
  createData('Germany', 'DE', 83019200, 357578),
  createData('Ireland', 'IE', 4857000, 70273),
  createData('Mexico', 'MX', 126577691, 1972550),
  createData('Japan', 'JP', 126317000, 377973),
  createData('France', 'FR', 67022000, 640679),
  createData('United Kingdom', 'GB', 67545757, 242495),
  createData('Russia', 'RU', 146793744, 17098246),
  createData('Nigeria', 'NG', 200962417, 923768),
  createData('Brazil', 'BR', 210147125, 8515767),
];

const StickyHeadTable = () => {

  const rowsA = [
    createDataA('13/02/2022', 'Departamento Principal', 'Adquisicion de nuevas PC','Estimando Ingeniero Jorge Freire',<button onClick={() => handleOpenModal()} className={styles.button}></button>),
    createDataA('13/02/2022', 'Departamento Principal', 'Adquisicion de nuevas PC','Estimando Ingeniero Jorge Freire',<button onClick={() => handleOpenModal()} className={styles.button}></button>),
    createDataA('13/02/2022', 'Departamento Principal', 'Adquisicion de nuevas PC','Estimando Ingeniero Jorge Freire',<button onClick={() => handleOpenModal()} className={styles.button}></button>),
    createDataA('13/02/2022', 'Departamento Principal', 'Adquisicion de nuevas PC','Estimando Ingeniero Jorge Freire',<button onClick={() => handleOpenModal()} className={styles.button}></button>),
    createDataA('13/02/2022', 'Departamento Principal', 'Adquisicion de nuevas PC','Estimando Ingeniero Jorge Freire',<button onClick={() => handleOpenModal()} className={styles.button}></button>),
    createDataA('13/02/2022', 'Departamento Principal', 'Adquisicion de nuevas PC','Estimando Ingeniero Jorge Freire',<button onClick={() => handleOpenModal()} className={styles.button}></button>),
  
  ]

  const handleButtonClick = (a) => {
    setOpenModal(true)
    return a;
  }
  
const columnsA= [
  {id: 'fecha', label: 'Fecha', minWidth: 200 },
  {id: 'remitente', label: 'Remitente', minWidth: 200},
  {id: 'asunto', label: 'Asunto', minWidth: 200},
  {id: 'mensaje', label: 'Mensaje', minWidth: 200},
  {
    id: 'button',
    label: 'Categoria',
    minWidth: 100,
    align: 'center'
  }
  
]

const handleOpenModal = () => {
  setOpenModal(true);
};

const handleCloseModal = () => {
  setOpenModal(false);
};

const [openModal, setOpenModal]= React.useState(false);


  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', borderRadius: '20px' }}
      className="animate__animated animate__zoomIn"
    >
      <TableContainer sx={{ maxHeight: 410 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columnsA.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rowsA
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  // AQUI FALTA AGREGAR UN KEY  
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columnsA.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rowsA.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <TransitionsModal
        abrir={openModal}
        handleCloseModal={handleCloseModal}
      />
    </Paper>
  );
}

=======
import React from 'react'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import "animate.css";
import styles from './styles/Table.module.css'
import TransitionsModal from './TransitionsModal';
// import OpenInFullIcon from '@mui/icons-material/OpenInFull';


const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
  {
    id: 'population',
    label: 'Population',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'size',
    label: 'Size\u00a0(km\u00b2)',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'density',
    label: 'Density',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
];

function createDataA(fecha, remitente, asunto, mensaje, button = null){
  return {fecha, remitente, asunto, mensaje, button};
}

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}



const rows = [
  createData('India', 'IN', 1324171354, 3287263),
  createData('China', 'CN', 1403500365, 9596961),
  createData('Italy', 'IT', 60483973, 301340),
  createData('United States', 'US', 327167434, 9833520),
  createData('Canada', 'CA', 37602103, 9984670),
  createData('Australia', 'AU', 25475400, 7692024),
  createData('Germany', 'DE', 83019200, 357578),
  createData('Ireland', 'IE', 4857000, 70273),
  createData('Mexico', 'MX', 126577691, 1972550),
  createData('Japan', 'JP', 126317000, 377973),
  createData('France', 'FR', 67022000, 640679),
  createData('United Kingdom', 'GB', 67545757, 242495),
  createData('Russia', 'RU', 146793744, 17098246),
  createData('Nigeria', 'NG', 200962417, 923768),
  createData('Brazil', 'BR', 210147125, 8515767),
];

const StickyHeadTable = () => {

  const rowsA = [
    createDataA('13/02/2022', 'Departamento Principal', 'Adquisicion de nuevas PC','Estimando Ingeniero Jorge Freire',<button onClick={() => handleOpenModal()} className={styles.button}></button>),
    createDataA('13/02/2022', 'Departamento Principal', 'Adquisicion de nuevas PC','Estimando Ingeniero Jorge Freire',<button onClick={() => handleOpenModal()} className={styles.button}></button>),
    createDataA('13/02/2022', 'Departamento Principal', 'Adquisicion de nuevas PC','Estimando Ingeniero Jorge Freire',<button onClick={() => handleOpenModal()} className={styles.button}></button>),
    createDataA('13/02/2022', 'Departamento Principal', 'Adquisicion de nuevas PC','Estimando Ingeniero Jorge Freire',<button onClick={() => handleOpenModal()} className={styles.button}></button>),
    createDataA('13/02/2022', 'Departamento Principal', 'Adquisicion de nuevas PC','Estimando Ingeniero Jorge Freire',<button onClick={() => handleOpenModal()} className={styles.button}></button>),
    createDataA('13/02/2022', 'Departamento Principal', 'Adquisicion de nuevas PC','Estimando Ingeniero Jorge Freire',<button onClick={() => handleOpenModal()} className={styles.button}></button>),
  
  ]

  const handleButtonClick = (a) => {
    setOpenModal(true)
    return a;
  }
  
const columnsA= [
  {id: 'fecha', label: 'Fecha', minWidth: 200 },
  {id: 'remitente', label: 'Remitente', minWidth: 200},
  {id: 'asunto', label: 'Asunto', minWidth: 200},
  {id: 'mensaje', label: 'Mensaje', minWidth: 200},
  {
    id: 'button',
    label: 'Categoria',
    minWidth: 100,
    align: 'center'
  }
  
]

const handleOpenModal = () => {
  setOpenModal(true);
};

const handleCloseModal = () => {
  setOpenModal(false);
};

const [openModal, setOpenModal]= React.useState(false);


  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', borderRadius: '20px' }}
      className="animate__animated animate__zoomIn"
    >
      <TableContainer sx={{ maxHeight: 410 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columnsA.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rowsA
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  // AQUI FALTA AGREGAR UN KEY  
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columnsA.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rowsA.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <TransitionsModal
        abrir={openModal}
        handleCloseModal={handleCloseModal}
      />
    </Paper>
  );
}

>>>>>>> 249c57bfc6d68c4a5b435e819488e329cb6924d6
export default StickyHeadTable