// this is the homepage
// TODO

import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import styles from "./Home.module.css";

export default function Home() {

    const { control , handleSubmit } = useForm();
    const { keyword, setKeyword } = useState();
    const onSubmit = async data => {
        setKeyword(data.searchValue);
        alert(data.searchValue);
    };

    return (
        <div>
            <form className={styles.home} onSubmit={handleSubmit(onSubmit)}>
                <Controller 
                    name="searchValue"
                    control={control}
                    defaultValue=""
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField
                        className={styles.searchBox}
                        variant="outlined"
                        label="Search an item..."
                        size="small"
                        value={value}
                        onChange={onChange}
                    />
                    )}
                />
                <Button variant="contained" color="primary" className={styles.searchButton} type="submit">Search</Button>
            </form>
        </div>
            
    )
    
}