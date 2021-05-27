// this is the homepage
// TODO

import React from "react";
import { Button, TextField } from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import styles from "./Home.module.css";
import PageTitle from "../../components/PageTitle";
import Test from "../../testfile";

export default function Home() {

    const { control , handleSubmit } = useForm();
    const onSubmit = data => alert(JSON.stringify(data))


    return (
        <div>
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
                <Button variant="contained" color="primary" className={styles.searchButton} type="submit">Search</Button>
            </form>
            <Test />
        </div>
            
    )
    
}