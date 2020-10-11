import React, { useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { UserContext } from '../../App';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { Button } from '@material-ui/core';
import Bookings from '../bookings/Bookings';

const Book = () => {
    const { bedType } = useParams();
    const [loggedInUser] = useContext(UserContext);
    const [selectedDate, setSelectedDate] = useState({
        checkIn: new Date(),
        checkOut: new Date(),
    });

    const handleCheckInDate = (date) => {
        const newDates = { ...setSelectedDate };
        newDates.checkOut = selectedDate.checkOut;

        newDates.checkIn = date;

        setSelectedDate(newDates);
    };
    const handleCheckOutDate = (date) => {
        const newDates = { ...setSelectedDate };
        newDates.checkIn = selectedDate.checkIn;

        newDates.checkOut = date;
        setSelectedDate(newDates);
    };
    const handleBooking = () => {
        const newBooking = { ...loggedInUser, ...selectedDate };

        fetch('http://localhost:4000/addBooking', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(newBooking),
        })
            .then((res) => res.json())
            .then((data) => console.log(data));
    };
    return (
        <div style={{ textAlign: 'center' }}>
            <h1>
                Hello, {loggedInUser.name}. Let's book a {bedType} Room.
            </h1>
            <p>
                Want a <Link to="/home">different room?</Link>{' '}
            </p>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                    <KeyboardDatePicker
                        margin="normal"
                        id="date-picker-dialog"
                        label="Check Out Data"
                        format="MM/dd/yyyy"
                        value={selectedDate.checkIn}
                        onChange={handleCheckInDate}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                    <KeyboardDatePicker
                        margin="normal"
                        id="date-picker-dialog"
                        label="Check Out Data"
                        format="MM/dd/yyyy"
                        value={selectedDate.checkOut}
                        onChange={handleCheckOutDate}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </Grid>
                <Button
                    variant="contained"
                    onClick={handleBooking}
                    color="primary"
                >
                    Book Now
                </Button>
            </MuiPickersUtilsProvider>
            <Bookings></Bookings>
        </div>
    );
};

export default Book;
