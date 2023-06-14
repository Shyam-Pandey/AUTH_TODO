let user = await User.findOne({email}).select("+password");
    if(!user){
            return res.status(404).json({
                success : false,
                message:"User does not exist"
            });
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(404).json({
                success : false,
                message:"Password is incorrect"
            });
        }
        const token = await jwt.sign({_id:user._id},process.env.JWT_SECRET)
        return res.status(200).cookie("token",token,{
            httpOnly : true,
            maxAge: 15 * 60 * 1000
        }).json({
            success : true,
            message:`Welcome Back${" "}${user.name}`
        });