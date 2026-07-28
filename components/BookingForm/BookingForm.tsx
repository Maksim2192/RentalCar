"use client";

import { useState } from "react";
import style from "./BookingForm.module.css";

type Props = {
    action: (formData: FormData) => Promise<void>;
};

type Errors = {
    name: string;
    email: string;
    comment: string;
};

export default function BookingForm({ action }: Props) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [comment, setComment] = useState("");

    const [errors, setErrors] = useState<Errors>({
        name: "",
        email: "",
        comment: "",
    });

    function validate() {
        const newErrors: Errors = {
            name: "",
            email: "",
            comment: "",
        };

        if (!name.trim()) {
            newErrors.name = "Please enter your name.";
        }

        if (!email.trim()) {
            newErrors.email = "Please enter your email.";
        } else if (!email.includes("@")) {
            newErrors.email = "Please enter a valid email.";
        }

        if (!comment.trim()) {
            newErrors.comment = "Comment is required";
        }

        setErrors(newErrors);

        return !Object.values(newErrors).some(Boolean);
    }

    async function onSubmit(formData: FormData) {
        if (!validate()) {
            return;
        }

        await action(formData);

        setName("");
        setEmail("");
        setComment("");

        setErrors({
            name: "",
            email: "",
            comment: "",
        });
    }

    return (
        <form className={style.forms} action={onSubmit} noValidate>
            <div className={style.field}>
                <div className={style.inputWrapper}>
                    <input
                        id="booking-name"
                        className={`${style.tabl} ${errors.name ? style.error : ""
                            }`}
                        type="text"
                        name="Name"
                        value={name}
                        placeholder=" "
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={
                            errors.name ? "booking-name-error" : undefined
                        }
                        onChange={(e) => {
                            setName(e.target.value);

                            if (errors.name) {
                                setErrors((previousErrors) => ({
                                    ...previousErrors,
                                    name: "",
                                }));
                            }
                        }}
                    />

                    <label
                        className={style.floatingLabel}
                        htmlFor="booking-name"
                    >
                        Name*
                    </label>

                    {errors.name && (
                        <svg
                            className={style.errorIcon}
                            width={20}
                            height={20}
                            aria-hidden="true"
                        >
                            <use href="/icons.svg#error"></use>
                        </svg>
                    )}
                </div>

                {errors.name && (
                    <p
                        id="booking-name-error"
                        className={style.errorText}
                    >
                        {errors.name}
                    </p>
                )}
            </div>

            <div className={style.field}>
                <div className={style.inputWrapper}>
                    <input
                        id="booking-email"
                        className={`${style.tabl} ${errors.email ? style.error : ""
                            }`}
                        type="email"
                        name="Email"
                        value={email}
                        placeholder=" "
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={
                            errors.email ? "booking-email-error" : undefined
                        }
                        onChange={(e) => {
                            setEmail(e.target.value);

                            if (errors.email) {
                                setErrors((previousErrors) => ({
                                    ...previousErrors,
                                    email: "",
                                }));
                            }
                        }}
                    />

                    <label
                        className={style.floatingLabel}
                        htmlFor="booking-email"
                    >
                        Email*
                    </label>

                    {errors.email && (
                        <svg
                            className={style.errorIcon}
                            width={20}
                            height={20}
                            aria-hidden="true"
                        >
                            <use href="/icons.svg#error"></use>
                        </svg>
                    )}
                </div>

                {errors.email && (
                    <p
                        id="booking-email-error"
                        className={style.errorText}
                    >
                        {errors.email}
                    </p>
                )}
            </div>

            <div className={style.field}>
                <div className={style.inputWrapper}>
                    <textarea
                        id="booking-comment"
                        className={`${style.tablcomment} ${errors.comment ? style.error : ""
                            }`}
                        name="Comment"
                        value={comment}
                        placeholder=" "
                        aria-invalid={Boolean(errors.comment)}
                        aria-describedby={
                            errors.comment
                                ? "booking-comment-error"
                                : undefined
                        }
                        onChange={(e) => {
                            setComment(e.target.value);

                            if (errors.comment) {
                                setErrors((previousErrors) => ({
                                    ...previousErrors,
                                    comment: "",
                                }));
                            }
                        }}
                    />

                    <label
                        className={style.floatingLabelComment}
                        htmlFor="booking-comment"
                    >
                        Comment*
                    </label>

                    {errors.comment && (
                        <svg
                            className={style.errorIcon}
                            width={20}
                            height={20}
                            aria-hidden="true"
                        >
                            <use href="/icons.svg#error"></use>
                        </svg>
                    )}
                </div>

                {errors.comment && (
                    <p
                        id="booking-comment-error"
                        className={style.errorText}
                    >
                        {errors.comment}
                    </p>
                )}
            </div>

            <button className={style.buttonsend} type="submit">
                Send
            </button>
        </form>
    );
}