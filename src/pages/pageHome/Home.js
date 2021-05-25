// this is the homepage
// TODO

import React from "react";
import { Button, TextField } from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import styles from "./Home.module.css";
import PageTitle from "../../components/PageTitle";

export default function Home() {

    const { control , handleSubmit } = useForm();
    const onSubmit = data => alert(JSON.stringify(data))


    return (
        <form className={styles.home} onSubmit={handleSubmit(onSubmit)}>
            <PageTitle />
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
            <Button variant="contained" color="primary" className={styles.searchButton}>Search</Button>
        </form>
    )
    
}