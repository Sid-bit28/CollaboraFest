import User from '../models/User.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, UnAuthenticatedError } from '../errors/index.js';

const register = async (req, res) => {
    const { name, email, password } = req.body;

    // Error handling
    if (!name || !email || !password) {
        throw new BadRequestError('Please provide all values');
    }

    // check for duplicate email from controller.
    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
        throw new BadRequestError('User already exists');
    }

    const user = await User.create({ name, email, password });
    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({
        user: {
            email: user.email,
            lastName: user.lastName,
            skill: user.skill,
            name: user.name,
        },
        token,
        skill: user.skill,
    });
};

const login = async (req, res) => {
    const { email, password } = req.body;

    // invalid input validation 👋
    if (!email || !password) {
        throw new BadRequestError('Please provide all values');
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
        throw new UnAuthenticatedError('Invalid email or password');
    }

    // password validation
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
        throw new UnAuthenticatedError('Invalid email or password');
    }

    const token = user.createJWT();
    // just to shut the password down 😒
    user.password = undefined;
    // we can also acrobat the user here 👇
    res.status(StatusCodes.OK).json({ user, token, skill: user.skill });
};

const updateUser = async (req, res) => {
    // console.log(req.body);
    // res.send('updateUser');
    if (
        !req.body.name ||
        !req.body.email ||
        !req.body.lastName ||
        !req.body.skill
    ) {
        throw new BadRequestError('Please provide all the values');
    }

    const user = await User.findOne({ _id: req.user.userId });

    user.email = req.body.email;
    user.name = req.body.name;
    user.lastName = req.body.lastName;
    user.skill = req.body.skill;

    await user.save();

    const token = user.createJWT();

    console.log({ user, token, skill: user.skill });
    res.status(StatusCodes.OK).send({ user, token, skill: user.skill });
};

export { register, login, updateUser };
