import React, { useState } from 'react';
import { Form, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Disclaimer from '../disclaimer/Disclaimer';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { userNeeder } from '../../redux/actions/userInfoAction.js';

function SignUpNeeder() {
    const [validated, setValidated] = useState(false);
    const [first_name, setFirst_name] = useState('');
    const [last_name, setLast_name] = useState('');
    const [age, setAge] = useState('');
    const [phone, setPhone] = useState('');
    const [street, setStreet] = useState('');
    const [email, setEmail] = useState('');
    const [description, setDescription] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmpassword] = useState('');
    const [modalShow, setModalShow] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [signedin, setSignedin] = useState(false);

    const dispatch = useDispatch();

    // get the needer
    const usertype = useSelector((state) => state.userInfo.is_needer);
    const url = '/api/needer/signup';

    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else if (password !== confirmpassword) {
            setErrorMessage(
                'Password and Confirm password are not same, try again'
            );
            // alert("password and confirmpassword does not match");
            event.stopPropagation();
        } else {
            const userdata = {
                first_name: first_name,
                last_name: last_name,
                age: age,
                phone: phone,
                street: street,
                description: description,
                email: email,
                password: password,
                is_giver: 0,
                is_needer: 1,
                agreement: 1,
            };

            try {
                const response = await axios.post(url, userdata).then((res) => {
                    console.log(res);
                    setSignedin(true);
                });
            } catch (error) {
                // should be error.response.data.message
                setErrorMessage('Email already exist, Please try Sign In');
                // alert('email already exist, please try login');
                console.error('There was an error!', error);
            }
        }

        event.preventDefault();
        setValidated(true);
    };
    if (signedin === true) return <Redirect to={{ pathname: '/login' }} />;

    return (
        <div className="forms">
            <h1 className="text-center formh1"> Who are you?</h1>
            <div className="container formview">
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Row>
                        <Form.Group as={Col} md="6" controlId="first_name">
                            <Form.Label>First name</Form.Label>
                            <Form.Control
                                required
                                name="first_name"
                                type="text"
                                minLength="3"
                                maxLength="50"
                                onChange={(e) => setFirst_name(e.target.value)}
                            />
                            <Form.Control.Feedback type="valid"></Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                                At least 3 letters
                            </Form.Control.Feedback>{' '}
                        </Form.Group>
                        <Form.Group as={Col} md="6" controlId="last_name">
                            <Form.Label>Last name</Form.Label>
                            <Form.Control
                                required
                                name="last_name"
                                type="text"
                                minLength="3"
                                maxLength="50"
                                onChange={(e) => setLast_name(e.target.value)}
                            />
                            <Form.Control.Feedback type="valid"></Form.Control.Feedback>{' '}
                            <Form.Control.Feedback type="invalid">
                                At least 3 letters
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} md="2" controlId="age">
                            <Form.Label>Age</Form.Label>
                            <Form.Control
                                required
                                type="number"
                                min={18}
                                max={120}
                                name="age"
                                onChange={(e) => setAge(e.target.value)}
                            />
                            <Form.Control.Feedback type="valid"></Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                                Enter age between 18-120
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId="phone">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                                required
                                type="number"
                                placeholder="+32"
                                value={validated.phone}
                                name="phone"
                                minLength="5"
                                maxLength="255"
                                onChange={(e) => setPhone(e.target.value)}
                            />
                            <Form.Control.Feedback type="valid"></Form.Control.Feedback>
                            <Form.Text className="text-muted">
                                We'll never share your phone number with anyone
                                else.
                            </Form.Text>
                            <Form.Control.Feedback type="invalid">
                                Enter phone number.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="6" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                required
                                name="email"
                                onChange={(e) => setEmail(e.target.value)}
                            />{' '}
                            <Form.Control.Feedback type="valid"></Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                                Enter email address.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} md="12" controlId="address">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="text"
                                required
                                minLength="5"
                                maxLength="255"
                                name="address"
                                onChange={(e) => setStreet(e.target.value)}
                            />{' '}
                            <Form.Control.Feedback type="valid"></Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                                Enter your street name at least 5 letters
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} md="12" controlId="description">
                            <Form.Label>
                                Tell us your story in 200 words
                            </Form.Label>
                            <Form.Control
                                as="textarea"
                                required
                                placeholder="Example: I am Sabrina, I came from Palestine. I just move to Belgium last month with my husband and my little daughter. I live in Brussel, I stay in a studio with very limited furniture. I know this app from a friend, I hope I could find some stuff that could be useful for me."
                                minLength="200"
                                maxLength="500"
                                rows={5}
                                name="description"
                                onChange={(e) => setDescription(e.target.value)}
                            />{' '}
                            <Form.Control.Feedback type="valid"></Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                                Explain your situation in at least 200 letters
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} md="12" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                minLength="8"
                                maxLength="255"
                                required
                                name="password"
                                onChange={(e) => setPassword(e.target.value)}
                            />{' '}
                            <Form.Control.Feedback type="valid"></Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                                Password must be 8 letters
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group
                            as={Col}
                            md="12"
                            controlId="confirmpassword"
                            onChange={(e) => setConfirmpassword(e.target.value)}
                        >
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                minLength="8"
                                maxLength="255"
                                required
                            />{' '}
                        </Form.Group>
                    </Form.Row>
                    <Form.Group>
                        {/* 
                    <a href="" onClick={()=>setModalShow(true)}>*/}
                        <Form.Check
                            required
                            label="Agree to the terms and conditions "
                            feedback="You must agree before submitting."
                        />

                        {/*</a>*/}

                        <Disclaimer
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                        />
                    </Form.Group>
                    {errorMessage && (
                        <div className="error"> {errorMessage} </div>
                    )}

                    {/* class="btn-submit float-right btn btn-primary */}
                    {/* <Button type="submit" className="formb"> */}
                    <Button type="submit" className="btn-submit float-right">
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
    );
}
export default SignUpNeeder;
