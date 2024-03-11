import mongoose from "mongoose";

export const carritosModelo=mongoose.model(
    "carritos",
    new mongoose.Schema(
        {
            numero: Number,
            usuario: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "usuarios"
            },
            productos:[],
            total: Number
        }, {timestamps: true}
    )
)

