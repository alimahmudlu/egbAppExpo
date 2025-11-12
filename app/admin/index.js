import SgTemplateHeader from "@/components/templates/Header/Header";
import SgTemplateScreen from "@/components/templates/Screen/Screen";
import {useAuth} from "@/hooks/useAuth";
import {StyleSheet} from "react-native";
import React from "react";

export default function EmployeeDashboardScreen() {
    const {user} = useAuth();

    return (<SgTemplateScreen
            head={<SgTemplateHeader
                name={user?.full_name}
                role={user?.role?.name}
                position={null}
                profileImage={''}
            />}
        >

        </SgTemplateScreen>);
}

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: "#fff",
    }, title: {
        fontFamily: "Inter", fontSize: 16, fontStyle: "normal", fontWeight: "600", lineHeight: 20,
    },
});
